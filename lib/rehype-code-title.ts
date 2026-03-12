import { visit } from 'unist-util-visit'
import type { Root, Element, Text } from 'hast'

/**
 * Moves the `data-rehype-pretty-code-title` sibling div text into a
 * `data-title` attribute on the `<pre>` element, then removes the div.
 * This lets MdxPre render its own title bar fully in React.
 */
export function rehypeCodeTitle() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'figure') return

      const props = node.properties ?? {}
      // rehype-pretty-code stores data attributes with dash-case keys
      if (!('data-rehype-pretty-code-figure' in props) && !('dataRehypePrettyCodeFigure' in props))
        return

      const elements = node.children.filter((c): c is Element => c.type === 'element')
      const titleEl = elements.find(
        (c) =>
          'data-rehype-pretty-code-title' in (c.properties ?? {}) ||
          'dataRehypePrettyCodeTitle' in (c.properties ?? {})
      )
      const preEl = elements.find((c) => c.tagName === 'pre')

      if (!titleEl || !preEl) return

      const title = titleEl.children
        .map((c) => (c.type === 'text' ? (c as Text).value : ''))
        .join('')

      preEl.properties = { ...preEl.properties, 'data-title': title }
      node.children = node.children.filter((c) => c !== titleEl)
    })
  }
}
