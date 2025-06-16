import {Feed, Item} from "feed";
import {getPrints} from "@/lib/data/index";

export async function getFeed(): Promise<Feed> {
    const prints = await getPrints();
    const feed = new Feed({
        title: "Amazon Paws",
        description: "The paw prints Amazon leaves on the world.",
        id: "https://amazonpaws.com",
        language: "en",
        updated: new Date(prints[0]["date"]),
        copyright: "Some rights reserved",
        generator: "https://github.com/jpmonette/feed",
        feedLinks: {
            "rss": "https://amazonpaws.com/feeds/rss",
            "atom": "https://amazonpaws.com/feeds/atom",
            "json": "https://amazonpaws.com/feeds/json",
        }
    })
    prints.forEach(print => {
        const item: Item = {
            title: print.heading,
            id: print.id,
            link: `https://amazonpaws.com/print/${print.id}`,
            description: print.text,
            content: print.text,
            date: new Date(print.date),
        };
        if (print.image) {
            item.image = {
                url: print.image.src,
                title: print.image.caption || print.image.alt,
                type: print.image.src.substring(5).split(';')[0],
            };
        }
        feed.addItem(item)
    })
    return feed;
}