'use client'

import {PostCard} from '@/components/PostCard'
import {cn} from '@/lib/cn'
import {type PostInfo} from '@/types/post'

interface PostListProps extends React.ComponentProps<'div'> {
  posts: PostInfo[]
}

export function PostList({posts, className, ...props}: PostListProps) {
  return (
    <div className={cn('flex flex-col gap-8', className)} {...props}>
      {posts.map(post => (
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
  )
}
