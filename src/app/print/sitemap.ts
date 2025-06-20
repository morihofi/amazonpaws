import {getPrints, getPrintsCount} from "@/lib/data";
import type {MetadataRoute} from "next";
import {BASE_URL} from "@/lib/constants";

export const dynamic = 'force-dynamic'

const elementsPerPage = 50000

export async function generateSitemaps(): Promise<{id : number}[]> {
    // Fetch the total number of products and calculate the number of sitemaps needed
    const out = []
    for (let i = 0; i < Math.ceil(await getPrintsCount() / elementsPerPage); i++) {
        out.push({id: i})
    }
    return out
}

export default async function sitemap({ id }: {id : number}): Promise<MetadataRoute.Sitemap> {
    const prints = await getPrints(elementsPerPage, id*elementsPerPage)
    return prints.map(it => ({
        url: `${BASE_URL}/print/${it.id.toString()}`,
        changeFrequency: "daily"
    }))
}