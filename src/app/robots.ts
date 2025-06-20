import type { MetadataRoute } from 'next'
import {generateSitemaps as generatePrintSitemaps} from "@/app/print/sitemap";

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const sitemaps = ['/sitemap.xml']
    sitemaps.push(...(await generatePrintSitemaps()).map(( {id}) => `/print/sitemap/${id}.xml`))
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
        ],
        sitemap: sitemaps
    }
}