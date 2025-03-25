'use server'

import {mdxOptions} from '@/lib/mdx/config'
import {type Post} from '@/types/post'
import {MDXRemote} from 'next-mdx-remote/rsc'

export async function MDXContent({content}: Post) {
  return <MDXRemote source={content} components={{}} options={{mdxOptions}} />
}
