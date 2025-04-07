'use server'

import type {Metadata} from 'next'
import {CategorySelect} from '@/components/CategorySelect'
import {PostList} from '@/components/PostList'
import {getCategoryList} from '@/lib/content/categories'
import {getPostList, getPostCountByCategory} from '@/lib/content/posts'
import {siteDomain} from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '블로그',
    description: '프로그래밍을 좋아하는 개발자 김현재의 포스트 목록',
    openGraph: {
      images: [
        {
          url: siteDomain + '/assets/posts/blog/thumbnail.png',
        },
      ],
    },
    twitter: {
      images: [
        {
          url: siteDomain + '/assets/posts/blog/thumbnail.png',
        },
      ],
    },
  }
}

export default async function Posts() {
  const posts = await getPostList()
  const categories = await getCategoryList()
  const postCounts = await getPostCountByCategory()

  const activeCategories = categories.filter(
    ({category}) => postCounts[category] > 0,
  )

  return (
    <section aria-label="posts" className="container mx-auto max-w-4xl">
      <CategorySelect categories={activeCategories} />
      <PostList posts={posts} />
    </section>
  )
}
