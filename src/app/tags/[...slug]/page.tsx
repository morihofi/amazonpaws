import {getPrints} from "@/lib/data";
import {InteractivePawTrack} from "@/components/PawTrack";
import styles from "@/app/page.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {preSignedPrints} from "@/lib/data/s3";
import {Metadata} from "next";
import {SITE_TITLE} from "@/lib/constants";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Tags: ${slug.join(", ")} — ${SITE_TITLE}`,
        description: "The paw prints Amazon leaves on the world.",
        robots: "noindex, follow"
    }
}

export default async function Page({
     params,
 }: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params;
    const decoded = slug.map(decodeURI);
    const prints = await getPrints(undefined, undefined, decoded);
    const wrappedPrints = await preSignedPrints(prints);

    return (
        <>
            <div className="hint">
                <h1>Filtered Paw Prints</h1>
                <p>Filtered for: <i>{decoded.join(", ")}</i></p>
                <p>
                    <Link href="/"><FontAwesomeIcon icon={faX}/> Remove filter</Link>
                </p>
            </div>
            <InteractivePawTrack initialPrints={wrappedPrints} tags={slug} />
            <a className={styles.top} href="#">Back To Top</a>
        </>
    )
}