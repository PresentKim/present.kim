import {MetadataRoute} from 'next'
import {getPostList} from '@/lib/content/posts'
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
      url: `${siteDomain}/posts/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      priority: 0.8,
    })
  })
  return links
}
