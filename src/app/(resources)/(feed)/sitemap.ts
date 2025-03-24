import {MetadataRoute} from 'next'
import {siteDomain} from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: `${siteDomain}`,
      lastModified: new Date(),
    },
  ]
  return links
}
