import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { sharedMdxComponents } from '@/mdx-components'

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
        rehypePlugins: [],
      },
    },
  })
  return content
}
