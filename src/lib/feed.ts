import {Feed} from 'feed'
import {
  siteName,
  siteDescription,
  siteDomain,
  ownerName,
  ownerEmail,
} from '@/lib/metadata'
import {getPostList} from './content/posts'
import {getProjectList} from './content/projects'

export async function getFeed() {
  const feed = new Feed({
    title: siteName,
    description: siteDescription,
    id: siteDomain,
    link: siteDomain,
    image: `${siteDomain}/thumbnail.png`,
    favicon: `${siteDomain}/favicon.ico`,
    copyright: `All rights reserved since ${new Date().getFullYear()} ${ownerName.en}`,
    language: 'ko',
    generator: 'generate-rss',
    feedLinks: {
      json: `${siteDomain}/feed.json`,
      atom: `${siteDomain}/atom.xml`,
      rss: `${siteDomain}/rss.xml`,
    },
    author: {
      name: ownerName.en,
      link: siteDomain,
      email: ownerEmail,
    },
  })

  const posts = await getPostList()

  posts.forEach(post => {
    const url = `${siteDomain}/posts/${post.path}`
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.summary,
      content: post.frontmatter.summary,
      author: [
        {
          name: ownerName.en,
          email: ownerEmail,
          link: siteDomain,
        },
      ],
      date: new Date(post.frontmatter.date),
      ...(post.frontmatter.tags && {
        category: post.frontmatter.tags.map(tag => ({name: tag})),
      }),
    })
  })

  const projects = await getProjectList()
  projects.forEach(project => {
    const url = `${siteDomain}/projects/${project.path}`
    feed.addItem({
      title: project.frontmatter.title,
      id: url,
      link: url,
      description: project.frontmatter.summary,
      content: project.frontmatter.summary,

      author: [
        {
          name: ownerName.en,
          email: ownerEmail,
          link: siteDomain,
        },
      ],
      date: new Date(project.frontmatter.startDate),
      ...(project.frontmatter.techStack && {
        category: project.frontmatter.techStack.map(tech => ({name: tech})),
      }),
    })
  })

  return feed
}
