import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { getRestaurantStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

// GET — public: returns current status
export async function GET() {
    const status = await getRestaurantStatus();
    return NextResponse.json(status);
}

// POST — auth-protected: set manual override
export async function POST(request: NextRequest) {
    // We expect the Admin Page to send the Supabase session token in the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { override } = body; // "open", "closed", or "auto"

    if (override !== "open" && override !== "closed" && override !== "auto") {
        return NextResponse.json(
            { error: "Invalid status. Use 'open', 'closed', or 'auto'." },
            { status: 400 }
        );
    }

    // Determine booleans
    const emergency_closed = override === "closed";
    const force_open = override === "open";

    const authClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    );

    // Update Supabase Database Row ID 1
    const { error: updateError } = await authClient
        .from("store_settings")
        .update({
            emergency_closed,
            force_open,
            updated_at: new Date().toISOString()
        })
        .eq("id", 1);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    const newStatus = await getRestaurantStatus();
    return NextResponse.json(newStatus);
}
