import { defineArrayMember, defineType, defineField } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    { title: 'URL', value: 'href' },
                    { title: 'Page', value: 'page' },
                    { title: 'Post', value: 'post' },
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({ parent }) => parent?.linkType !== 'href' && parent?.linkType != null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'href' && !value) {
                      return 'URL is required when Link Type is URL'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'page',
                title: 'Page',
                type: 'reference',
                to: [{ type: 'page' }],
                hidden: ({ parent }) => parent?.linkType !== 'page',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'page' && !value) {
                      return 'Page reference is required when Link Type is Page'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'post',
                title: 'Post',
                type: 'reference',
                to: [{ type: 'post' }],
                hidden: ({ parent }) => parent?.linkType !== 'post',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'post' && !value) {
                      return 'Post reference is required when Link Type is Post'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    // Image with caption
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility and SEO',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
        }),
        defineField({
          name: 'layout',
          type: 'string',
          title: 'Layout',
          description: 'How the image should be displayed',
          options: {
            list: [
              { title: 'Inline (same width as text)', value: 'inline' },
              { title: 'Wide (breaks out of text)', value: 'wide' },
              { title: 'Full Width (edge to edge)', value: 'fullWidth' },
            ],
          },
          initialValue: 'inline',
        }),
      ],
    }),
    // Side Note (Marginalia)
    defineArrayMember({
      type: 'object',
      name: 'sideNote',
      title: 'Side Note',
      fields: [
        defineField({
          name: 'content',
          title: 'Text Content',
          type: 'string',
          description: 'Optional text displayed in the side margin',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Optional image for the marginalia',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
        defineField({
          name: 'video',
          title: 'Video URL',
          type: 'url',
          description: 'Optional video URL (YouTube, Vimeo, etc.)',
        }),
        defineField({
          name: 'position',
          title: 'Position',
          type: 'string',
          description: 'Which side to display the note',
          options: {
            list: [
              { title: 'Right', value: 'right' },
              { title: 'Left', value: 'left' },
            ],
          },
          initialValue: 'right',
        }),
        defineField({
          name: 'desktopOnly',
          title: 'Show on Desktop Only',
          type: 'boolean',
          description: 'If enabled, this note will be hidden on mobile/tablet screens per user request',
          initialValue: false,
        }),
      ],
      preview: {
        select: {
          content: 'content',
          position: 'position',
          image: 'image',
          video: 'video',
          desktopOnly: 'desktopOnly',
        },
        prepare({ content, position, image, video, desktopOnly }) {
          const type = image ? '📷' : video ? '🎬' : '📝'
          const visibility = desktopOnly ? ' 🖥️' : ''
          return {
            title: `${type} Side Note${visibility}`,
            subtitle: `[${position || 'right'}] ${content || (image ? 'Image' : video ? 'Video' : '')}`,
            media: image,
          }
        },
      },
    }),
    // Code block
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'SQL', value: 'sql' },
              { title: 'Plain Text', value: 'text' },
            ],
          },
        }),
        defineField({
          name: 'code',
          title: 'Code',
          type: 'text',
        }),
        defineField({
          name: 'filename',
          title: 'Filename',
          type: 'string',
          description: 'Optional filename to display',
        }),
      ],
      preview: {
        select: {
          language: 'language',
          code: 'code',
        },
        prepare({ language, code }) {
          return {
            title: language || 'Code Block',
            subtitle: code?.substring(0, 50) + '...',
          }
        },
      },
    }),
    // Map embed (Google Maps, Mapbox, etc.)
    defineArrayMember({
      type: 'object',
      name: 'mapEmbed',
      title: 'Map Embed',
      fields: [
        defineField({
          name: 'url',
          title: 'Embed URL',
          type: 'url',
          description: 'The embed URL from Google Maps, Mapbox, or other map provider',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption displayed below the map',
        }),
        defineField({
          name: 'aspectRatio',
          title: 'Aspect Ratio',
          type: 'string',
          options: {
            list: [
              { title: '16:9 (Widescreen)', value: '16/9' },
              { title: '4:3 (Standard)', value: '4/3' },
              { title: '1:1 (Square)', value: '1/1' },
              { title: '21:9 (Ultrawide)', value: '21/9' },
            ],
          },
          initialValue: '16/9',
        }),
      ],
      preview: {
        select: {
          url: 'url',
          caption: 'caption',
        },
        prepare({ url, caption }) {
          return {
            title: 'Map Embed',
            subtitle: caption || url?.substring(0, 50),
          }
        },
      },
    }),
    // Image Gallery (side-by-side images)
    defineArrayMember({
      type: 'object',
      name: 'imageGallery',
      title: 'Image Gallery',
      fields: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.min(2).max(4),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption for the gallery',
        }),
        defineField({
          name: 'layout',
          type: 'string',
          title: 'Layout',
          description: 'Layout style for the gallery',
          options: {
            list: [
              { title: 'Standard (Grid)', value: 'standard' },
              { title: 'Staggered (Abstract)', value: 'staggered' },
            ],
          },
          initialValue: 'standard',
        }),
      ],
      preview: {
        select: {
          images: 'images',
          caption: 'caption',
        },
        prepare({ images, caption }) {
          return {
            title: `Gallery (${images?.length || 0} images)`,
            subtitle: caption || 'No caption',
          }
        },
      },
    }),
  ],
})
