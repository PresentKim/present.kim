'use server'

import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {MDXContent} from '@/components/mdx/MDXContent'
import PostViewCount from '@/components/ui/PostViewCount'
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
        <header className="mx-auto mb-8 w-full max-w-3xl px-4 @max-md:px-2">
          <h1 className="mb-4 text-4xl font-bold">{post.frontmatter.title}</h1>
          {post.frontmatter.description && (
            <p className="mb-4 text-xl text-gray-600">
              {post.frontmatter.description}
            </p>
          )}
          <div className="flex items-center text-sm">
            <div className="text-muted mr-4 flex items-center gap-2">
              <PostViewCount slug={slug} /> views
            </div>
            <span className="text-muted">{post.frontmatter.dateString}</span>
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
