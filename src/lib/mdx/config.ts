import {type CompileOptions} from '@mdx-js/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import {createHighlighter} from 'shiki'

interface LineElement {
  type: string
  value?: string
  children: Array<{type: string; value: string}>
  properties: {
    className: string[]
  }
}

export const mdxOptions: CompileOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ['anchor'],
        },
      },
    ],
    rehypeCodeTitles,
    [
      rehypePrettyCode,
      {
        theme: 'github-dark-dimmed',
      },
    ],
  ],
  format: 'mdx',
}
