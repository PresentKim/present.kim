'use server'

import {readFileSync} from 'fs'
import {glob} from 'glob'
import matter from 'gray-matter'
import path from 'path'

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects')

/**
 * ProjectFrontmatter defines the metadata structure for a project document.
 */
export interface ProjectFrontmatter {
  /** The title of the project (e.g., "Git Resource") */
  title: string

  /** A short summary of the project */
  summary: string

  /** The start date of the project (format: "YYYY-MM-DD") */
  startDate: string

  /** The end date of the project (null if ongoing) */
  endDate: string | null

  /** A list of technologies used in the project */
  techStack: string[]

  /** Whether the project is a draft (true = not published) */
  draft: boolean

  /** Path to the project's thumbnail image */
  thumbnail: string
}

export interface ProjectInfo {
  path: string
  category: string
  slug: string
  frontmatter: ProjectFrontmatter
}

export interface Project extends ProjectInfo {
  content: string
}

/**
 * Get project list (frontmatter only)
 */
export async function getProjectList(
  category?: string,
): Promise<ProjectInfo[]> {
  const projectPaths = await glob('**/*.mdx', {cwd: PROJECTS_PATH})

  return projectPaths
    .map(projectPath => {
      const category = path.dirname(projectPath)
      const slug = path.basename(projectPath).replace(/\.mdx$/, '')
      const source = readFileSync(path.join(PROJECTS_PATH, projectPath), 'utf8')
      const {data: frontmatter} = matter(source)

      return {
        path: `${category}/${slug}`,
        category: category,
        slug,
        frontmatter: frontmatter as ProjectFrontmatter,
      }
    })
    .filter(project => !project.frontmatter.draft)
    .filter(project => !category || project.category === category)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.startDate).getTime() -
        new Date(a.frontmatter.startDate).getTime(),
    )
}

/**
 * Get project detail (frontmatter + rendered content)
 */
export async function getProjectDetail(slug: string): Promise<Project> {
  const decodedSlug = decodeURIComponent(slug)
  const category = path.dirname(decodedSlug)
  const projectPath = path.join(PROJECTS_PATH, decodedSlug + '.mdx')
  const source = readFileSync(projectPath, 'utf8')
  const {data: frontmatter, content} = matter(source)

  return {
    path: decodedSlug,
    category,
    slug: path.basename(decodedSlug),
    frontmatter: frontmatter as ProjectFrontmatter,
    content,
  }
}

/**
 * Get all project slugs
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  const projectPaths = await glob('**/*.mdx', {cwd: PROJECTS_PATH})
  return projectPaths.map(path => path.replace(/\.mdx$/, ''))
}

/**
 * Get project count by category
 */
export async function getProjectCountByCategory(): Promise<
  Record<string, number>
> {
  const projectPaths = await glob('**/*.mdx', {cwd: PROJECTS_PATH})
  const counts: Record<string, number> = {}

  projectPaths.forEach(projectPath => {
    const category = path.dirname(projectPath)
    const source = readFileSync(path.join(PROJECTS_PATH, projectPath), 'utf8')
    const {data: frontmatter} = matter(source)

    if (!frontmatter.draft) {
      counts[category] = (counts[category] || 0) + 1
    }
  })

  return counts
}
