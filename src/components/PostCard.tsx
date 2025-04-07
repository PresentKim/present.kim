'use client'

import Image from 'next/image'
import Link from 'next/link'
import {Calendar, Eye} from 'lucide-react'
import {cn} from '@/lib/cn'

interface PostCardProps extends React.ComponentProps<'a'> {
  title: string
  summary: string
  date: string
  slug: string
  category: string
  thumbnail: string
  viewCount?: number
}

export function PostCard({
  title,
  summary,
  date,
  slug,
  category,
  thumbnail,
  viewCount,
  className,
  ...props
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className={cn('group flex overflow-hidden', className)}
      {...props}>
      <div
        aria-label="post-info"
        className="flex h-fit flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground line-clamp-2 flex-1 text-sm">
          {summary}
        </p>
        <div className="text-muted-foreground flex items-center justify-start gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>{date}</span>
          </div>
          {viewCount !== undefined && (
            <div className="flex items-center gap-1">
              <Eye className="size-4" />
              <span>{viewCount}</span>
            </div>
          )}
          <span className="bg-card rounded-xs px-2 py-1 uppercase">
            {category}
          </span>
        </div>
      </div>
      <div className="border-card relative aspect-[3/2] h-16 overflow-hidden rounded-lg border transition-all hover:shadow-md md:h-24">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  )
}
