import {MetadataRoute} from 'next'
import {getPostList} from '@/lib/content/posts'
import {getProjectList} from '@/lib/content/projects'
import {siteDomain} from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: `${siteDomain}`,
      lastModified: new Date(),
      priority: 1,
    },
  ]
  const posts = await getPostList()
  posts.forEach(post => {
    links.push({
      url: `${siteDomain}/posts/${post.path}`,
      lastModified: new Date(post.frontmatter.date),
      priority: 0.8,
    })
  })
  const projects = await getProjectList()
  projects.forEach(project => {
    links.push({
      url: `${siteDomain}/projects/${project.path}`,
      lastModified: new Date(project.frontmatter.startDate),
      priority: 0.7,
    })
  })
  return links
}
