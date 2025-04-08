'use client'

import Link from 'next/link'
import {cn} from '@/lib/cn'
import type {CategoryInfo} from '@/lib/content/categories'

interface Props {
  categories: CategoryInfo[]
  currentCategory?: string
}

function CategoryButton({
  category,
  title,
  isActive,
}: {
  category: string
  title: string
  isActive: boolean
}) {
  return (
    <Link
      href={`/posts/${category}`}
      className={cn(
        'rounded-md px-2 py-1 transition-colors',
        isActive
          ? 'bg-neutral-900 text-white hover:bg-neutral-700'
          : 'bg-neutral-100 text-black hover:bg-neutral-200',
      )}>
      {title}
    </Link>
  )
}

export function CategorySelect({categories, currentCategory}: Props) {
  return (
    <div className="mb-4 ml-4 flex flex-wrap gap-x-4 gap-y-2">
      <CategoryButton
        category=""
        title="전체"
        isActive={currentCategory === undefined}
      />
      {categories.map(({category, title}) => (
        <CategoryButton
          key={category}
          category={category}
          title={title}
          isActive={currentCategory == category}
        />
      ))}
    </div>
  )
}
