import { NextRequest, NextResponse } from "next/server";
import {
    createSession,
    isAuthenticated,
    AUTH_COOKIE_NAME,
    COOKIE_MAX_AGE,
} from "@/lib/auth";

// GET — check if session is valid
export async function GET() {
    const authenticated = await isAuthenticated();
    return NextResponse.json({ authenticated });
}

// POST — login
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, password } = body;

    const expectedUsername = process.env.ADMIN_USERNAME || "zamri";
    const expectedPassword = process.env.ADMIN_PASSWORD || "takanaJuo-1";

    if (username !== expectedUsername || password !== expectedPassword) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const token = await createSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
    });

    return response;
}

// DELETE — logout
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
}
