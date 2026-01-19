/**
 * This component uses Portable Text to render a post body.
 * Uses custom article-content CSS class for typography styling.
 */

import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import ResolvedLink from '@/app/components/ResolvedLink'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => <h1>{children}</h1>,
      h2: ({ children }) => <h2>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      h4: ({ children }) => <h4>{children}</h4>,
      normal: ({ children }) => <p>{children}</p>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <code>{children}</code>,
    },
    types: {
      // Image with layout options
      image: ({ value }) => {
        const imageUrl = urlForImage(value)?.url()
        if (!imageUrl) return null

        const layout = value.layout || 'inline'
        const layoutClass = ({
          inline: 'img-inline',
          wide: 'img-wide',
          fullWidth: 'img-full',
        } as const)[layout as 'inline' | 'wide' | 'fullWidth'] || 'img-inline'

        const aspectRatio = value.aspectRatio || '16:9'
        const isOriginalRatio = aspectRatio === 'original'

        // Map aspect ratios to Tailwind classes
        const aspectClasses: Record<string, string> = {
          '16:9': 'aspect-video',
          '4:3': 'aspect-[4/3]',
          '1:1': 'aspect-square',
          '3:2': 'aspect-[3/2]',
          '21:9': 'aspect-[21/9]',
        }
        const aspectClass = aspectClasses[aspectRatio] || 'aspect-video'

        return (
          <figure className={layoutClass}>
            {isOriginalRatio ? (
              <div className="relative w-full overflow-hidden rounded bg-muted">
                <Image
                  src={imageUrl}
                  alt={value.alt || ''}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className={`relative ${aspectClass} w-full overflow-hidden rounded bg-muted`}>
                <Image
                  src={imageUrl}
                  alt={value.alt || ''}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      // Side note renderer - Absolute positioned in margin
      sideNote: ({ value }) => {
        const isLeft = value.position === 'left'
        const imageUrl = value.image ? urlForImage(value.image)?.url() : null

        // Convert video URL to embed URL
        const getEmbedUrl = (url: string) => {
          if (!url) return null
          if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be')
              ? url.split('/').pop()
              : new URL(url).searchParams.get('v')
            return `https://www.youtube.com/embed/${videoId}`
          }
          if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop()
            return `https://player.vimeo.com/video/${videoId}`
          }
          return url
        }
        const embedUrl = value.video ? getEmbedUrl(value.video) : null

        return (
          <aside
            className={`
              ${value.desktopOnly ? 'hidden lg:block' : 'relative my-6 pt-2 border-t border-border'}
              lg:absolute lg:my-0 lg:w-[33.33%] lg:mt-1
              ${isLeft
                ? 'lg:right-[calc(100%+2rem)] lg:text-right'
                : 'lg:left-[calc(100%+2rem)]'}
            `}
          >
            {/* Image */}
            {imageUrl && (
              <figure className="mb-3">
                <Image
                  src={imageUrl}
                  alt={value.image?.alt || ''}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
                {value.image?.caption && (
                  <figcaption className="mt-1 text-sm text-muted-foreground">
                    {value.image.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Video */}
            {embedUrl && (
              <div className="mb-3 relative aspect-video overflow-hidden rounded border border-border bg-muted">
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            {/* Text content */}
            {value.content && (
              <div className="text-sm text-muted-foreground">
                {value.content}
              </div>
            )}
          </aside>
        )
      },
      // Updated Image Gallery with Staggered Support
      imageGallery: ({ value }) => {
        const isStaggered = value.layout === 'staggered'

        if (isStaggered) {
          return (
            <div className="my-12 grid grid-cols-2 gap-4 lg:gap-8">
              {value.images.map((image: any, i: number) => {
                const imageUrl = urlForImage(image)?.url()
                return (
                  <div key={image._key || i} className={`relative aspect-[3/4] overflow-hidden rounded-lg bg-muted ${i % 2 === 1 ? 'mt-12' : ''}`}>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={image.alt || ''}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )
        }

        return (
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {value.images.map((image: any) => {
              const imageUrl = urlForImage(image)?.url()
              return (
                <figure key={image._key} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={image.alt || ''}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  )}
                </figure>
              )
            })}
            {value.caption && (
              <figcaption className="col-span-full mt-2 text-center text-sm text-muted-foreground">
                {value.caption}
              </figcaption>
            )}
          </div>
        )
      },
      // Code block
      codeBlock: ({ value }) => {
        return (
          <figure className="my-6">
            {value.filename && (
              <div className="flex items-center gap-2 px-4 py-2 bg-muted border border-border border-b-0 rounded-t">
                <span className="font-mono text-xs text-muted-foreground">{value.filename}</span>
              </div>
            )}
            <pre className={`bg-muted border border-border p-4 overflow-x-auto ${value.filename ? 'rounded-b' : 'rounded'}`}>
              <code className="font-mono text-sm">
                {value.code}
              </code>
            </pre>
          </figure>
        )
      },
      // Map embed
      mapEmbed: ({ value }) => {
        const aspectRatioMap: Record<string, string> = {
          '16/9': 'aspect-video',
          '4/3': 'aspect-[4/3]',
          '1/1': 'aspect-square',
          '21/9': 'aspect-[21/9]',
        }
        const aspectRatioClass = aspectRatioMap[value.aspectRatio] || 'aspect-video'

        return (
          <figure className="img-wide">
            <div className={`relative w-full ${aspectRatioClass} overflow-hidden rounded border border-border bg-muted`}>
              <iframe
                src={value.url}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  )
}
