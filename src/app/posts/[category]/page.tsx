'use server'

import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {CategorySelect} from '@/components/CategorySelect'
import {PostList} from '@/components/PostList'
import {getCategoryInfo, getCategoryList} from '@/lib/content/categories'
import {getPostList, getPostCountByCategory} from '@/lib/content/posts'
import {siteDomain} from '@/lib/metadata'

interface Props {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const categoryInfo = await getCategoryInfo((await params).category)
  if (!categoryInfo) {
    notFound()
  }

  return {
    title: `${categoryInfo.title} - 블로그`,
    summary: categoryInfo.description,
    openGraph: {
      images: [
        {
          url: siteDomain + categoryInfo.thumbnail,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: siteDomain + categoryInfo.thumbnail,
        },
      ],
    },
  }
}

export default async function CategoryPosts({params}: Props) {
  const {category} = await params
  const categoryInfo = await getCategoryInfo(category)
  if (!categoryInfo) {
    notFound()
  }

  const posts = await getPostList(category)
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
      <CategorySelect
        categories={activeCategories}
        currentCategory={category}
      />

      <PostList posts={posts} />
    </section>
  )
}
