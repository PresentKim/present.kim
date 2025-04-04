'use server'

import {readFileSync} from 'fs'
import {glob} from 'glob'
import path from 'path'

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

export interface CategoryInfo {
  category: string
  title: string
  description: string
  thumbnail: string
}

export async function getCategoryList(): Promise<CategoryInfo[]> {
  const categoryPaths = await glob('*/.category-info.json', {cwd: POSTS_PATH})

  return categoryPaths
    .map(categoryPath => {
      const source = readFileSync(path.join(POSTS_PATH, categoryPath), 'utf8')
      return JSON.parse(source) as CategoryInfo
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export async function getCategoryInfo(category: string): Promise<CategoryInfo | null> {
  try {
    const source = readFileSync(
      path.join(POSTS_PATH, category, '.category-info.json'),
      'utf8',
    )
    return JSON.parse(source) as CategoryInfo
  } catch {
    return null
  }
}
