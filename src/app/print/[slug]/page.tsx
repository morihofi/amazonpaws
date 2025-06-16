import {getPrint} from "@/lib/data";
import {notFound} from "next/navigation";
import {FinalButton, FinalLink, PawTrack} from "@/components/PawTrack";
import Link from "next/link";
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
    const print = await getPrint(slug);
    if (!print) {
        return notFound()
    }
    return {
        title: `${print.heading} — ${SITE_TITLE}`,
        description: print.text,
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