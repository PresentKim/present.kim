'use server'

import {MDXRemote} from 'next-mdx-remote/rsc'
import {mdxOptions} from '@/lib/mdx/config'
import {type Post} from '@/types/post'

export async function MDXContent({content}: Post) {
  return <MDXRemote source={content} components={{}} options={{mdxOptions}} />
}
