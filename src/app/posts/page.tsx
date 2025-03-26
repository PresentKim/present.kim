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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">블로그 포스트</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <article
            key={post.path}
            className="bg-card rounded-lg p-6 shadow transition-shadow hover:shadow-md">
            <Link href={`/posts/${post.path}`} className="block">
              <h2 className="mb-2 text-2xl font-semibold">
                {post.frontmatter.title}
              </h2>
              {post.frontmatter.description && (
                <p className="text-foreground mb-4">
                  {post.frontmatter.description}
                </p>
              )}
              <div className="text-foreground flex items-center text-sm">
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.frontmatter.tags && (
                  <div className="ml-4 flex gap-2">
                    {post.frontmatter.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-card rounded px-2 py-1 text-xs">
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
    </div>
  )
}
