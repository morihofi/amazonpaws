import {getFeed} from "@/lib/data/feed";

export const dynamic = 'force-dynamic'

export async function GET() {
    const feed = await getFeed();
    return new Response(feed.atom1(), {headers: { 'Content-Type': 'application/atom+xml'}})
}

