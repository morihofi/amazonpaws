import {getFeed} from "@/lib/data/feed";

export async function GET() {
    const feed = await getFeed();
    return new Response(feed.rss2(), {headers: { 'Content-Type': 'application/rss+xml'}})
}

