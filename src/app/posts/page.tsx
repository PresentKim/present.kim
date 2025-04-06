'use server'

import type {Metadata} from 'next'
import {CategorySelect} from '@/components/CategorySelect'
import {PostList} from '@/components/PostList'
import {getCategoryList} from '@/lib/content/categories'
import {getPostList, getPostCountByCategory} from '@/lib/content/posts'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '블로그',
    summary: '프로그래밍을 좋아하는 개발자 김현재의 포스트 목록',
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
