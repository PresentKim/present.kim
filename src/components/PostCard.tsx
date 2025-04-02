import Image from 'next/image'
import Link from 'next/link'
import {cn} from '@/lib/cn'
import dayjs from 'dayjs'
import {Calendar, Eye} from 'lucide-react'

interface PostCardProps extends React.ComponentProps<'a'> {
  title: string
  description: string
  date: string
  slug: string
  category: string
  thumbnail: string
  viewCount?: number
}

export function PostCard({
  title,
  description,
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
      className={cn('group flex flex-col overflow-hidden', className)}
      {...props}>
      <div className="border-card relative aspect-[2/1] w-full overflow-hidden rounded-lg border transition-all hover:shadow-md">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        <p className="line-clamp-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-500">
          <span className="bg-card rounded-xs px-2 py-1 uppercase">
            {category}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <time dateTime={date}>
                {dayjs(date).format('YYYY년 M월 D일')}
              </time>
            </div>
            {viewCount !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="size-4" />
                <span>{viewCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
