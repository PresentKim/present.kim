'use server'

import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import Giscus from '@giscus/react'
import {Calendar, Eye} from 'lucide-react'
import {MDXContent} from '@/components/mdx/MDXContent'
import Comment from '@/components/ui/Comment'
import PostViewCount from '@/components/ui/PostViewCount'
import {getAllPostSlugs, getPostDetail} from '@/lib/content/posts'
import {siteDomain} from '@/lib/metadata'

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
      description: post.frontmatter.summary,
      openGraph: {
        images: [
          {
            url: siteDomain + post.frontmatter.thumbnail,
          },
        ],
      },
      twitter: {
        images: [
          {
            url: siteDomain + post.frontmatter.thumbnail,
          },
        ],
      },
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
        <header className="relative mx-auto mb-8 w-full max-w-3xl overflow-hidden rounded-lg">
          <div
            aria-label="Post Header Background"
            className="absolute inset-0 -z-10 h-full w-full">
            <Image
              src={post.frontmatter.thumbnail}
              alt={post.frontmatter.title}
              fill
              sizes="20vw"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              priority
            />
          </div>
          <div
            aria-label="Post Header Foreground"
            className="h-full w-full bg-black/30 px-4 py-8 backdrop-blur-xs @max-md:px-2">
            <h1 className="text-shadow-xl mb-4 text-center text-3xl font-bold text-white text-shadow-gray-900/30">
              {post.frontmatter.title}
            </h1>
            <div className="text-muted flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-muted">
                  {post.frontmatter.dateString}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <PostViewCount slug={slug} />
                views
              </div>
            </div>
          </div>
        </header>
        <div className="mx-auto mb-8 w-full max-w-3xl px-4 @max-md:px-2">
          <MDXContent {...post} />
        </div>
        <div className="mx-auto mb-8 w-full max-w-3xl px-4 @max-md:px-2">
          <Comment />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Post rendering error:', error)
    notFound()
  }
}
