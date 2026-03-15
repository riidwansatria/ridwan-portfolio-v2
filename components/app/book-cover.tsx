import Image from 'next/image'

type BookCoverProps = {
  src: string | null
  title: string
  className?: string
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
)

export function BookCover({ src, title, className, ...rest }: BookCoverProps) {
  if (!src) {
    if (rest.fill) {
      return (
        <div
          className={`absolute inset-0 bg-muted border border-border/30 ${className ?? ''}`}
        />
      )
    }
    return (
      <div
        style={{ width: rest.width, height: rest.height, minWidth: rest.width }}
        className={`bg-muted rounded-sm shrink-0 border border-border/30 ${className ?? ''}`}
      />
    )
  }

  if (rest.fill) {
    return (
      <Image
        src={src}
        alt={`Cover of ${title}`}
        fill
        className={`object-cover ${className ?? ''}`}
        sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={`Cover of ${title}`}
      width={rest.width}
      height={rest.height}
      className={`rounded-sm object-cover shrink-0 ${className ?? ''}`}
      style={{ minWidth: rest.width }}
    />
  )
}
