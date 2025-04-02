'use server'

import type {Metadata} from 'next'
import {PostCard} from '@/components/PostCard'
import {getPostList} from '@/lib/content/posts'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '블로그',
    description: '프로그래밍을 좋아하는 개발자 김현재의 포스트 목록',
  }
}

export default async function Posts() {
  const posts = await getPostList()

  return (
    <section aria-label="posts" className="container mx-auto max-w-4xl">
      <h2 className="mb-4 ml-4 text-2xl font-semibold">블로그 포스트</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard
            key={post.path}
            category={post.category}
            title={post.frontmatter.title}
            description={post.frontmatter.description || ''}
            date={post.frontmatter.date}
            slug={post.path}
            thumbnail={post.frontmatter.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}
