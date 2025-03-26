import {Post, PostFrontmatter, PostInfo} from '@/types/post'
import dayjs from 'dayjs'
import {readFileSync} from 'fs'
import {glob} from 'glob'
import matter from 'gray-matter'
import path from 'path'

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

/**
 * Get post list (frontmatter only)
 */
export async function getPostList(): Promise<PostInfo[]> {
  const postPaths = await glob('**/*.mdx', {cwd: POSTS_PATH})

  return postPaths
    .map(postPath => {
      const category = path.dirname(postPath)
      const slug = path.basename(postPath).replace(/\.mdx$/, '')
      const source = readFileSync(path.join(POSTS_PATH, postPath), 'utf8')
      const {data: frontmatter} = matter(source)

      return {
        path: `${category}/${slug}`,
        category,
        slug,
        frontmatter: {
          ...frontmatter,
          dateString: dayjs(frontmatter.date).format('YYYY-MM-DD HH:mm'),
        } as PostFrontmatter,
      }
    })
    .filter(post => !post.frontmatter.draft)
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
  const postPath = path.join(POSTS_PATH, slug + '.mdx')
  const source = readFileSync(postPath, 'utf8')
  const {data: frontmatter, content} = matter(source)

  return {
    path: slug,
    category: path.dirname(slug),
    slug: path.basename(slug),
    frontmatter: frontmatter as PostFrontmatter,
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
