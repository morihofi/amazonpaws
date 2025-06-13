import {loadEnvConfig} from "@next/env";
import {randomBytes} from "node:crypto";

try {
    loadEnvConfig(process.cwd())
} catch (e) {
    console.error("Cannot load .env file:", e)
}

// This might create short-term sessions but protects from arbitrary session writes.
if (!process.env.SECRET_KEY) {
    process.env.SECRET_KEY = randomBytes(16).toString(
        "hex"
    )
}