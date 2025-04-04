'use server'

import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {CategorySelect} from '@/components/CategorySelect'
import {PostCard} from '@/components/PostCard'
import {getCategoryInfo, getCategoryList} from '@/lib/content/categories'
import {getPostList, getPostCountByCategory} from '@/lib/content/posts'

interface Props {
  params: {
    category: string
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const categoryInfo = await getCategoryInfo(params.category)
  if (!categoryInfo) {
    notFound()
  }

  return {
    title: `${categoryInfo.title} - 블로그`,
    description: categoryInfo.description,
  }
}

export default async function CategoryPosts({params}: Props) {
  const categoryInfo = await getCategoryInfo(params.category)
  if (!categoryInfo) {
    notFound()
  }

  const posts = await getPostList(params.category)
  if (posts.length === 0) {
    notFound()
  }

  const categories = await getCategoryList()
  const postCounts = await getPostCountByCategory()
  const activeCategories = categories.filter(
    ({category}) => postCounts[category] > 0,
  )

  return (
    <section aria-label="posts" className="container mx-auto max-w-4xl">
      <h2 className="mb-4 ml-4 text-2xl font-semibold">
        {categoryInfo.title} 포스트
      </h2>
      <CategorySelect
        categories={activeCategories}
        currentCategory={params.category}
      />

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  )
}
