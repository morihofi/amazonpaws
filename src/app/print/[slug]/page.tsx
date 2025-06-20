import {getPrint} from "@/lib/data";
import {notFound} from "next/navigation";
import {FinalLink, PawTrack} from "@/components/PawTrack";
import {preSignedPrint} from "@/lib/data/s3";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {SITE_TITLE} from "@/lib/constants";
import type {Metadata} from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    if (slug.length != 24) {
        return notFound()
    }
    const print = await getPrint(slug);
    if (!print) {
        return notFound()
    }
    const preSigned = await preSignedPrint(print);
    return {
        title: `${print.heading} — ${SITE_TITLE}`,
        description: print.text,
        openGraph: {
            title: `${print.heading} — ${SITE_TITLE}`,
            description: print.text,
            type: "article",
            modifiedTime: print.date,
            images: preSigned.image?.src ?
                {
                    url: preSigned.image?.src,
                    alt: preSigned.image?.alt
                }
             : undefined
        }
    }
}

export default async function Page({
       params,
   }: {
      params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const print = await getPrint(slug);
    if (!print) {
        return notFound()
    }
    const preSigned = await preSignedPrint(print);
    return (
        <>
            <PawTrack initialPrints={[preSigned]} />
            <FinalLink href="/">
                <FontAwesomeIcon icon={faHome} />&nbsp;Start from the beginning.
            </FinalLink>
        </>
    )
}