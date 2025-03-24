import {
  siteName,
  siteDescription,
  siteDomain,
  ownerName,
  ownerEmail,
} from '@/config/metadata'
import {Feed} from 'feed'

export function getFeed() {
  return new Feed({
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
}
