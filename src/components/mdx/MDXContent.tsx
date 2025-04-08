'use server'

import {MDXRemote} from 'next-mdx-remote/rsc'
import {mdxOptions} from '@/lib/mdx/config'

export async function MDXContent({content}: {content: string}) {
  return <MDXRemote source={content} components={{}} options={{mdxOptions}} />
}
