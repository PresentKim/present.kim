'use client'

import Link from 'next/link'
import type {CategoryInfo} from '@/lib/content/categories'
import clsx from 'clsx'

interface Props {
  categories: CategoryInfo[]
  currentCategory?: string
}

export function CategorySelect({categories, currentCategory}: Props) {
  return (
    <div className="mb-4 ml-4 flex flex-wrap gap-x-4 gap-y-2">
      <Link
        href="/posts"
        className={clsx(
          'border-base rounded-md border px-4 py-2 transition-colors',
          !currentCategory
            ? 'text-primary'
            : 'hover:bg-base active:bg-base text-base',
        )}>
        전체
      </Link>
      {categories.map(({category, title}) => (
        <Link
          key={category}
          href={`/posts/${category}`}
          className={clsx(
            'border-base rounded-md border px-4 py-2 transition-colors',
            currentCategory === category
              ? 'text-primary'
              : 'hover:bg-base active:bg-base text-base',
          )}>
          {title}
        </Link>
      ))}
    </div>
  )
}
