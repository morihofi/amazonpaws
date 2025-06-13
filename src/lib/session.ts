import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/types/sessionPayload'
import {cookies} from "next/headers";
import { randomBytes } from "crypto";

let encodedKey: Uint8Array | null = null;

function getEncodedKey() {
    if (!encodedKey) {
        let secret = process.env.SECRET_KEY;
        if (!secret) {
            console.log('Generating secret key');
            secret = randomBytes(16).toString('hex');
        }
        encodedKey = new TextEncoder().encode(secret);
    }
    return encodedKey;
}

export async function encrypt(payload: SessionPayload) {
    const key = getEncodedKey();
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(key)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const key = getEncodedKey();
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session', error)
    }
}


export async function createSession(login: boolean) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ login, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}


export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}


export async function isLoggedIn(): Promise<boolean> {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    return session?.login == true
}

