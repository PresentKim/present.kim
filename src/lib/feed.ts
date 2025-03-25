import {getAllPostsFrontmatter} from './posts'
import {
  siteName,
  siteDescription,
  siteDomain,
  ownerName,
  ownerEmail,
} from '@/lib/metadata'
import {Feed} from 'feed'

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

  const posts = await getAllPostsFrontmatter()

  posts.forEach(post => {
    const url = `${siteDomain}/posts/${post.slug}`
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      content: post.frontmatter.description,
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

  return feed
}
