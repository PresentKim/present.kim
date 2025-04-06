import type {Metadata} from 'next'
import {PostList} from '@/components/PostList'
import {getPostList} from '@/lib/content/posts'

export const metadata: Metadata = {
  summary: '프로그래밍을 좋아하는 개발자 김현재의 포트폴리오',
}

export default async function Home() {
  const allPostsData = await getPostList()
  const recentPosts = allPostsData.slice(0, 6)

  return (
    <section aria-label="posts" className="container mx-auto max-w-4xl">
      <h2 className="mb-4 ml-4 text-2xl font-semibold">최근 포스트</h2>
      <PostList posts={recentPosts} />
    </section>
  )
}
