'use server'

import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {MDXContent} from '@/components/mdx/MDXContent'
import {getAllPostSlugs, getPostDetail} from '@/lib/content/posts'

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({
    slug: slug.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const slug = (await params).slug.join('/')
  try {
    const post = await getPostDetail(slug)
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    }
  } catch {
    return {
      title: 'Post Not Found',
    }
  }
}

export default async function PostPage({params}: PostPageProps) {
  const slug = (await params).slug.join('/')

  try {
    const post = await getPostDetail(slug)

    return (
      <article className="prose flex w-full flex-col items-center justify-center py-8">
        <header className="mb-8 max-w-3xl px-4">
          <h1 className="mb-4 text-4xl font-bold">{post.frontmatter.title}</h1>
          {post.frontmatter.description && (
            <p className="mb-4 text-xl text-gray-600">
              {post.frontmatter.description}
            </p>
          )}
          <div className="flex items-center text-sm">
            <time dateTime={post.frontmatter.date} className="text-muted">
              {new Date(post.frontmatter.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.frontmatter.tags && (
              <div className="text-primary ml-4 flex gap-2">
                {post.frontmatter.tags.map(tag => (
                  <span key={tag} className="bg-card rounded px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="mx-auto mb-8 w-full max-w-3xl px-4 @max-md:px-2">
          <MDXContent {...post} />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Post rendering error:', error)
    notFound()
  }
}
