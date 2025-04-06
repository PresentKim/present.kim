import type {Metadata} from 'next'
import {PostCard} from '@/components/PostCard'
import {getPostList} from '@/lib/content/posts'
import {PostInfo} from '@/types/post'

export const metadata: Metadata = {
  summary: '프로그래밍을 좋아하는 개발자 김현재의 포트폴리오',
}

export default async function Home() {
  const allPostsData = await getPostList()
  const recentPosts = allPostsData.slice(0, 6)

  return (
    <section aria-label="posts" className="container mx-auto max-w-4xl">
      <h2 className="mb-4 ml-4 text-2xl font-semibold">최근 포스트</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post: PostInfo) => (
          <PostCard
            key={post.path}
            category={post.category}
            title={post.frontmatter.title}
            summary={post.frontmatter.summary || ''}
            date={post.frontmatter.dateString}
            slug={post.path}
            thumbnail={post.frontmatter.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}
