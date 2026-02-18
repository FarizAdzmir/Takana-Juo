import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getRestaurantStatus, setManualOverride } from "@/lib/status";

// GET — public: returns current status
export async function GET() {
    const status = await getRestaurantStatus();
    return NextResponse.json(status);
}

// POST — auth-protected: set manual override
export async function POST(request: NextRequest) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { override } = body; // "open", "closed", or null (auto)

    if (override !== "open" && override !== "closed" && override !== null) {
        return NextResponse.json(
            { error: "Invalid status. Use 'open', 'closed', or null." },
            { status: 400 }
        );
    }

    setManualOverride(override);
    const status = await getRestaurantStatus();
    return NextResponse.json(status);
}
