import Link from "next/link";
import {SITE_TITLE} from "@/lib/constants";

export const metadata = {
    title: `About ${SITE_TITLE}`,
    description: "What is Amazon Paws? On Amazon Paws we document the impact of Amazon on the world and society. Such as unfair business practices.",
}

export default function AboutPage() {
    return <div className="frame">
        <h1>About</h1>
        <p>
            At Amazon Paws we document the impact of Amazon on the world and society.
            It is not affiliated with Amazon in any way, but rather a critical examination of the company's actions.
            The page layout is a parody on the style of "official" Amazon sites like "amazon.com",
            for better linking Amazon with their behavior.
        </p>

        <h2>Motivation</h2>
        <p>
            Amazon plays an ubiquitous role in our lives.
            From media production and publishing, to audio and music streaming, e-commerce and even retail, Amazon plays a central role in many lives.
            With Amazon Web Services (AWS) it also has one of the largest cloud providers in the world;
            with many web services and companies depending on it.
        </p>
        <p>
            Having such a large market share means it can easily turn against us.
            Over the past there have been allegations of unfair business practices,
            and human an worker rights violations. Amazon Paws aims documents these problematic actions at a central place.
        </p>
        <h2>Origin of the name "Amazon Paws"</h2>
        <p>
            I frequently misread <em>amazonaws.com</em> (the domain for Amazon Web Service - AWS) as "amazonpaws.com".
            So I decided to register it for myself. It also sounds funny. <small style={{fontSize: "50%"}}>UwU</small>
        </p>
        <h2>Contributing</h2>
        <p>
            You want to contribute to this site? Great!
            Please see the <Link href="/contribute">contribution page</Link>.
        </p>
    </div>
}