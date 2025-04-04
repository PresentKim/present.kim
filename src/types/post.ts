export interface PostFrontmatter {
  title: string
  description?: string
  date: string
  dateString: string
  tags?: string[]
  thumbnail: string
  draft?: boolean
  [key: string]: string | string[] | boolean | undefined
}

export interface PostInfo {
  path: string
  category: string
  slug: string
  frontmatter: PostFrontmatter
}

export interface Post extends PostInfo {
  content: string
}
