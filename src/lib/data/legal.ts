import * as fs from "node:fs/promises";
import {unstable_cache} from "next/cache";

export const legalHtml = unstable_cache(async function() {
    if (process.env.LEGAL_FILE) {
        return await fs.readFile(process.env.LEGAL_FILE, { encoding: 'utf8' })
    } else {
        return "The site owner has not provided legal information."
    }
})