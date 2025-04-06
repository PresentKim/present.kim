'use client'

import {PostCard} from '@/components/PostCard'
import {cn} from '@/lib/cn'
import {type PostInfo} from '@/types/post'

interface PostListProps extends React.ComponentProps<'div'> {
  posts: PostInfo[]
}

export function PostList({posts, className, ...props}: PostListProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      {...props}>
      {posts.map(post => (
        <PostCard
          key={post.path}
          category={post.category}
          title={post.frontmatter.title}
          description={post.frontmatter.description || ''}
          date={post.frontmatter.dateString}
          slug={post.path}
          thumbnail={post.frontmatter.thumbnail}
        />
      ))}
    </div>
  )
}
