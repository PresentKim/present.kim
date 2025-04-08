'use server'

import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {Calendar} from 'lucide-react'
import {cn} from '@/lib/cn'
import {getProjectList} from '@/lib/content/projects'
import {siteDomain} from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '프로젝트',
    description: '프로그래밍을 좋아하는 개발자 김현재의 프로젝트 목록',
    openGraph: {
      images: [
        {
          url: siteDomain + '/assets/projects/thumbnail.png',
        },
      ],
    },
    twitter: {
      images: [
        {
          url: siteDomain + '/assets/projects/thumbnail.png',
        },
      ],
    },
  }
}

interface ProjectCardProps extends React.ComponentProps<'a'> {
  title: string
  summary: string
  startDate: string
  endDate: string | null
  slug: string
  techStack: string[]
  thumbnail: string
}
function ProjectCard({
  title,
  summary,
  startDate,
  endDate,
  slug,
  techStack,
  thumbnail,
  className,
  ...props
}: ProjectCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
    })
  }

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg bg-white',
        'shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
      {...props}>
      <div className="border-card relative aspect-[1280/640] overflow-hidden rounded-lg border">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div
        aria-label="post-info"
        className="flex h-fit flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 origin-left text-lg font-semibold transition-transform duration-300 group-hover:scale-105">
          {title}
        </h2>
        <p className="text-muted-foreground line-clamp-2 flex-1 text-sm">
          {summary}
        </p>
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <Calendar className="size-4" />
          <span>{formatDate(startDate)}</span>
          {endDate && <span>- {formatDate(endDate)}</span>}
        </div>
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default async function Posts() {
  const projects = await getProjectList()

  return (
    <section aria-label="posts" className="container mx-auto max-w-4xl">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <ProjectCard
            key={project.path}
            techStack={project.frontmatter.techStack}
            title={project.frontmatter.title}
            summary={project.frontmatter.summary}
            startDate={project.frontmatter.startDate}
            endDate={project.frontmatter.endDate}
            slug={project.path}
            thumbnail={project.frontmatter.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}
