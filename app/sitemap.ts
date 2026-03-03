import { MetadataRoute } from 'next'
import { getAllContentSlugs } from '@/lib/content'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const { projects, notes } = getAllContentSlugs()
  const domain = siteConfig.url

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'monthly',
    },
    {
      url: `${domain}/projects`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${domain}/notes`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'monthly',
    },
  ]

  for (const p of projects) {
    sitemap.push({
      url: `${domain}/projects/${p.slug}`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: 'monthly',
    })
  }

  for (const n of notes) {
    sitemap.push({
      url: `${domain}/notes/${n.slug}`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: 'monthly',
    })
  }

  return sitemap
}
