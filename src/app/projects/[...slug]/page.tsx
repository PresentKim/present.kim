'use server'

import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {Calendar} from 'lucide-react'
import {MDXContent} from '@/components/mdx/MDXContent'
import Comment from '@/components/ui/Comment'
import {getAllProjectSlugs, getProjectDetail} from '@/lib/content/projects'
import {siteDomain} from '@/lib/metadata'

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map(slug => ({
    slug: slug.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const slug = (await params).slug.join('/')
  try {
    const post = await getProjectDetail(slug)
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
      title: 'Project Not Found',
    }
  }
}

export default async function ProjectPage({params}: PostPageProps) {
  const slug = (await params).slug.join('/')

  try {
    const project = await getProjectDetail(slug)
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
      })
    }

    return (
      <article className="prose flex w-full flex-col items-center justify-center py-8">
        <header className="relative mx-auto mb-8 w-full max-w-3xl overflow-hidden rounded-sm">
          <div
            aria-label="Project Header Background"
            className="absolute inset-0 -z-10 h-full w-full">
            <Image
              src={project.frontmatter.thumbnail}
              alt={project.frontmatter.title}
              fill
              sizes="20vw"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              priority
            />
          </div>
          <div
            aria-label="Project Header Foreground"
            className="h-full w-full bg-black/50 px-4 py-8 backdrop-blur-xs @max-md:px-2">
            <h1 className="text-shadow-xl mb-4 text-center text-3xl font-bold text-white text-shadow-gray-900/30">
              {project.frontmatter.title}
            </h1>
            <div className="text-muted flex flex-col items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-muted">
                  {formatDate(project.frontmatter.startDate)}
                  {project.frontmatter.endDate &&
                    ` - ${formatDate(project.frontmatter.endDate)}`}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {project.frontmatter.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>
        <div className="mx-auto mb-8 w-full max-w-3xl px-4 @max-md:px-2">
          <MDXContent {...project} />
        </div>
        <div className="mx-auto mb-8 w-full max-w-3xl px-4 @max-md:px-2">
          <Comment />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Project rendering error:', error)
    notFound()
  }
}
