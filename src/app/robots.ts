import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ["/edit", "/login"],
                crawlDelay: 3600
            },
            {
                userAgent: 'amazonbot',
                disallow: '/',
            }
        ]
    }
}