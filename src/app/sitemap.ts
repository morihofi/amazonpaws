import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return ["/", "/about", "/contribute"].map(url => ({
        url: `${BASE_URL}${url}`,
        changeFrequency: "daily"
    }))
}