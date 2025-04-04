import {type CompileOptions} from '@mdx-js/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export const mdxOptions: CompileOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
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
        theme: 'one-light',
      },
    ],
    rehypeKatex,
  ],
  format: 'mdx',
}
