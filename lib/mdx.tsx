import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
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
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
  })
  return content
}
