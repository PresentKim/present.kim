'use server'

import type {Metadata} from 'next'
import Link from 'next/link'
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
          <article
            key={post.path}
            className="bg-card rounded-lg p-6 shadow transition-shadow hover:shadow-md">
            <Link href={`/posts/${post.path}`} className="block">
              <h3 className="text-primary mb-2 font-semibold uppercase">
                {post.category}
              </h3>
              <h2 className="mb-2 text-2xl font-semibold">
                {post.frontmatter.title}
              </h2>
              {post.frontmatter.description && (
                <p className="text-foreground mb-4">
                  {post.frontmatter.description}
                </p>
              )}
              <div className="text-foreground flex items-center text-sm">
                <span className="text-muted">
                  {post.frontmatter.dateString}
                </span>
                {post.frontmatter.tags && (
                  <div className="ml-4 flex gap-2">
                    {post.frontmatter.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-muted/10 rounded px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
