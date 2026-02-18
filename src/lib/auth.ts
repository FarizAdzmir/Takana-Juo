import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "tj_admin_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

async function createSignature(
    data: string,
    secret: string
): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(data)
    );
    return Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

export async function createSession(): Promise<string> {
    const secret = process.env.AUTH_SECRET || "default-secret";
    const timestamp = Date.now().toString();
    const signature = await createSignature(timestamp, secret);
    return `${timestamp}:${signature}`;
}

export async function verifySession(token: string): Promise<boolean> {
    const secret = process.env.AUTH_SECRET || "default-secret";
    const parts = token.split(":");
    if (parts.length !== 2) return false;

    const [timestamp, signature] = parts;

    // Check if expired (24 hours)
    const age = Date.now() - parseInt(timestamp);
    if (isNaN(age) || age > COOKIE_MAX_AGE * 1000) return false;

    const expectedSignature = await createSignature(timestamp, secret);
    return signature === expectedSignature;
}

export async function isAuthenticated(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
        if (!token) return false;
        return verifySession(token);
    } catch {
        return false;
    }
}
