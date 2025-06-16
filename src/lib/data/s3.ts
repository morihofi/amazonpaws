'use server';
import 'server-only'
import {
    DeleteObjectCommand, GetObjectCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";
import {AwsCredentialIdentity} from "@smithy/types";
import {unstable_cache} from "next/cache";
import {URL} from 'node:url';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {PawPrint} from "@/types/pawPrint";
import {UPLOAD_TO_S3} from "@/lib/constants";

export const getS3Client = unstable_cache(async () => {
    return new S3Client({
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        } as AwsCredentialIdentity,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: process.env.S3_PATH_STYLE != undefined,
        region: process.env.S3_REGION
    })
})

export async function upload(buffer: Buffer, key: string, contentType: string|undefined = undefined): Promise<string> {
    const client = await getS3Client()
    await client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType
    }))
    return `s3://${process.env.S3_BUCKET}/${key}`
}

function parseS3Url(url: string) {
    const parsed = URL.parse(url);
    if (parsed?.protocol != "s3:") {
        throw "Not an s3 URL"
    }
    return {
        Bucket: parsed.hostname,
        Key: parsed.pathname.substring(1)
    }
}

export async function deleteObject(url: string) {
    const client = await getS3Client()
    await client.send(new DeleteObjectCommand(
        parseS3Url(url)
    ))
}

const PRE_SIGNED_EXPIRATION = 60*60 * 24 * 7;

export const getPreSignedUrl = unstable_cache(async function(url: string): Promise<string> {
    const client = await getS3Client()
    const request = new GetObjectCommand(
        parseS3Url(url)
    )
    return await getSignedUrl(client, request, {
        expiresIn: PRE_SIGNED_EXPIRATION,
    })
}, undefined, {
    revalidate: PRE_SIGNED_EXPIRATION-3600,
})

export async function preSignedPrint(print: PawPrint) {
    if (UPLOAD_TO_S3 && print.image?.src && print.image.src.startsWith("s3://")) {
        print.image.src = await getPreSignedUrl(print.image.src)
    }
    return print
}

export async function preSignedPrints(prints: PawPrint[]) {
    return await Promise.all(prints.map(preSignedPrint))
}