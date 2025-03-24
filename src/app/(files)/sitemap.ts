import {MetadataRoute} from 'next'
import {siteDomain} from '@/config/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: `${siteDomain}`,
      lastModified: new Date(),
    },
  ]
  return links
}
