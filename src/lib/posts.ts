import {Post, PostFrontmatter, PostInfo} from '@/types/post'
import {readFileSync} from 'fs'
import {glob} from 'glob'
import matter from 'gray-matter'
import path from 'path'

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

/**
 * 모든 포스트의 frontmatter만 가져오기
 */
export async function getAllPostsFrontmatter(): Promise<PostInfo[]> {
  const postPaths = await glob('**/*.mdx', {cwd: POSTS_PATH})

  return postPaths
    .map(postPath => {
      const category = path.dirname(postPath)
      const slug = path.basename(postPath)
      const source = readFileSync(path.join(POSTS_PATH, postPath), 'utf8')
      const {data: frontmatter} = matter(source)

      return {
        path: `${category}/${slug}`,
        category,
        slug,
        frontmatter: frontmatter as PostFrontmatter,
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
 * 특정 포스트의 전체 내용 가져오기 (frontmatter + rendered content)
 */
export async function getPost(slug: string): Promise<Post> {
  const postPath = path.join(POSTS_PATH, slug)
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
 * 모든 포스트 슬러그 가져오기
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const postPaths = await glob('**/index.mdx', {cwd: POSTS_PATH})
  return postPaths.map(path => path.replace('/index.mdx', ''))
}
