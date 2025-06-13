import {getPrints} from "@/lib/data";
import PawTrack from "@/components/PawTrack";

export const dynamic = 'force-dynamic'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params;
    return {
        title: `Tags: ${slug.join(", ")} - Amazon Paws`,
        description: "The paw prints Amazon leaves on the world.",
    }
}

export default async function Page({
     params,
 }: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params;
    const prints = await getPrints(undefined, undefined, undefined, slug);
    return (
        <>
            <PawTrack initialPrints={prints} />
            <a className="restart" href="/public">Load from beginning</a>
        </>
    )
}
