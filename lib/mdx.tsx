import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import { rehypeCodeTitle } from './rehype-code-title'
import { sharedMdxComponents } from '@/mdx-components'

// ---------------------------------------------------------------------------
// rehype-pretty-code config
// ---------------------------------------------------------------------------

const prettyCodeOptions: Options = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
}

// ---------------------------------------------------------------------------
// Compiler
// ---------------------------------------------------------------------------

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: sharedMdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkUnwrapImages],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeCodeTitle],
      },
    },
  })
  return content
}
