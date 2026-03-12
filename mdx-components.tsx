import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { MdxPre } from '@/components/ui/copy-button'
import { NPPDiagram } from '@/components/mdx/NPPDiagram'
import { VariableTable } from '@/components/mdx/VariableTable'
import { StationMap } from '@/components/mdx/StationMap'
import { ClusterRadar } from '@/components/mdx/ClusterRadar'
import { ScatterPlot } from '@/components/mdx/ScatterPlot'
import { PolicyMatrix } from '@/components/mdx/PolicyMatrix'
import { Wide } from '@/components/mdx/Wide'
import { TodScrollytelling } from '@/components/custom/case-study/TodScrollytelling'

function MdxImage(props: ComponentPropsWithoutRef<typeof Image>) {
  const { alt, width, height, ...rest } = props
  const hasSize = width && height

  return (
    <figure>
      {hasSize ? (
        <Image
          {...rest}
          alt={alt ?? ''}
          width={width}
          height={height}
          className="rounded-lg w-full"
          sizes="(min-width: 768px) 720px, 100vw"
        />
      ) : (
        // Markdown ![alt](src) — no dimensions, use native img
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...(rest as ComponentPropsWithoutRef<'img'>)}
          alt={alt ?? ''}
          className="rounded-lg w-full"
        />
      )}
      {alt && alt !== 'image' && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground/70">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

function MdxLink(props: ComponentPropsWithoutRef<'a'>) {
  const href = props.href ?? ''
  if (href.startsWith('/')) {
    return <Link href={href} {...props} />
  }
  if (href.startsWith('#')) {
    return <a {...props} />
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}


function ImageGallery({
  children,
  columns = 2,
}: {
  children: ReactNode
  columns?: 1 | 2 | 3
}) {
  const columnClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns]

  return <div className={`my-8 grid grid-cols-1 gap-4 ${columnClass}`}>{children}</div>
}

function MdxTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  )
}

export const sharedMdxComponents: MDXComponents = {
  Image: MdxImage,
  img: MdxImage as never,
  a: MdxLink,
  pre: MdxPre,
  table: MdxTable,
  ImageGallery,
  NPPDiagram,
  VariableTable,
  StationMap,
  ClusterRadar,
  ScatterPlot,
  PolicyMatrix,
  Wide,
  TodScrollytelling,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...sharedMdxComponents,
    ...components,
  }
}
