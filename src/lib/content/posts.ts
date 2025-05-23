'use server'

import dayjs from 'dayjs'
import {readFileSync} from 'fs'
import {glob} from 'glob'
import matter from 'gray-matter'
import path from 'path'
import {Post, PostFrontmatter, PostInfo} from '@/types/post'

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

function processFrontmatter(
  category: string,
  frontmatter: {
    [key: string]: string
  },
): PostFrontmatter {
  return {
    ...frontmatter,
    thumbnail:
      frontmatter.thumbnail || `/assets/posts/${category}/thumbnail.png`,
    dateString: dayjs(frontmatter.date).format('YYYY-MM-DD'),
  } as PostFrontmatter
}

/**
 * Get post list (frontmatter only)
 */
export async function getPostList(category?: string): Promise<PostInfo[]> {
  const postPaths = await glob('**/*.mdx', {cwd: POSTS_PATH})

  return postPaths
    .map(postPath => {
      const category = path.dirname(postPath)
      const slug = path.basename(postPath).replace(/\.mdx$/, '')
      const source = readFileSync(path.join(POSTS_PATH, postPath), 'utf8')
      const {data: frontmatter} = matter(source)

      return {
        path: `${category}/${slug}`,
        category: category,
        slug,
        frontmatter: processFrontmatter(category, frontmatter),
      }
    })
    .filter(post => !post.frontmatter.draft)
    .filter(post => !category || post.category === category)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    )
}

/**
 * Get post detail (frontmatter + rendered content)
 */
export async function getPostDetail(slug: string): Promise<Post> {
  const decodedSlug = decodeURIComponent(slug)
  const category = path.dirname(decodedSlug)
  const postPath = path.join(POSTS_PATH, decodedSlug + '.mdx')
  const source = readFileSync(postPath, 'utf8')
  const {data: frontmatter, content} = matter(source)

  return {
    path: decodedSlug,
    category,
    slug: path.basename(decodedSlug),
    frontmatter: processFrontmatter(category, frontmatter),
    content,
  }
}

/**
 * Get all post slugs
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const postPaths = await glob('**/*.mdx', {cwd: POSTS_PATH})
  return postPaths.map(path => path.replace(/\.mdx$/, ''))
}

/**
 * Get post count by category
 */
export async function getPostCountByCategory(): Promise<
  Record<string, number>
> {
  const postPaths = await glob('**/*.mdx', {cwd: POSTS_PATH})
  const counts: Record<string, number> = {}

  postPaths.forEach(postPath => {
    const category = path.dirname(postPath)
    const source = readFileSync(path.join(POSTS_PATH, postPath), 'utf8')
    const {data: frontmatter} = matter(source)

    if (!frontmatter.draft) {
      counts[category] = (counts[category] || 0) + 1
    }
  })

  return counts
}
