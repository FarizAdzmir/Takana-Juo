import { supabase } from "@/lib/supabase";

// ============================================================
// Restaurant Status Logic
// Priority: Manual Override (Supabase) > Ramadan (Aladhan API) > Auto Hours
// ============================================================

export async function getStoreSettings() {
    try {
        const { data, error } = await supabase
            .from("store_settings")
            .select("*")
            .eq("id", 1)
            .single();

        if (error) {
            console.error("Error fetching store settings:", error);
            return { emergency_closed: false, force_open: false, updated_at: null };
        }

        return data || { emergency_closed: false, force_open: false, updated_at: null };
    } catch (e) {
        console.error("Failed to connect to store_settings", e);
        return { emergency_closed: false, force_open: false, updated_at: null };
    }
}

// ---- Business Hours (Tue-Sat, 3PM-12AM) ----

export function isWithinBusinessHours(): boolean {
    const now = new Date();

    // Convert to Malaysia Time (UTC+8) to prevent server timezone issues
    const options = { timeZone: 'Asia/Kuala_Lumpur', hour12: false };
    const klTimeStr = now.toLocaleString('en-US', options);
    const klDate = new Date(klTimeStr);

    const day = klDate.getDay(); // 0=Sun, 1=Mon, 2=Tue, ..., 6=Sat
    const hour = klDate.getHours();

    const isWorkingDay = day >= 2 && day <= 6; // Tue (2) to Sat (6)
    const isDuringHours = hour >= 15 && hour < 24; // 15:00 (3 PM) to 23:59 (12 AM)

    return isWorkingDay && isDuringHours;
}

// ---- Ramadan Detection via Aladhan API ----

let ramadanCache: { isRamadan: boolean; checkedDate: string } | null = null;

export async function isRamadan(): Promise<boolean> {
    const today = new Date();
    const dd = today.getDate().toString().padStart(2, "0");
    const mm = (today.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = today.getFullYear();
    const dateStr = `${dd}-${mm}-${yyyy}`;

    // Return cached result if already checked today
    if (ramadanCache && ramadanCache.checkedDate === dateStr) {
        return ramadanCache.isRamadan;
    }

    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/gToH/${dateStr}`,
            { next: { revalidate: 86400 } } // Cache for 24 hours
        );
        const data = await response.json();
        const hijriMonth = data?.data?.hijri?.month?.number;
        const result = hijriMonth === 9; // 9 is Ramadan

        ramadanCache = { isRamadan: result, checkedDate: dateStr };
        return result;
    } catch (error) {
        console.error("Failed to check Ramadan status:", error);
        return false; // Default to not Ramadan on API failure
    }
}

// ---- Comprehensive Status ----

export interface RestaurantStatus {
    isOpen: boolean;
    reason: string;
    details: {
        manualOverride: "open" | "closed" | null;
        overrideTimestamp: string | null;
        isRamadan: boolean;
        withinBusinessHours: boolean;
    };
}

export async function getRestaurantStatus(): Promise<RestaurantStatus> {
    const settings = await getStoreSettings();
    let ramadan = false;
    let withinHours = false;

    let isOpen: boolean;
    let reason: string;
    let manualOverrideState: "open" | "closed" | null = null;

    // Strict priority 1: Manual Overrides
    if (settings.emergency_closed) {
        isOpen = false;
        reason = "Emergency Closed";
        manualOverrideState = "closed";
        // Calculate background vars just for context
        ramadan = await isRamadan();
        withinHours = isWithinBusinessHours();
    } else if (settings.force_open) {
        isOpen = true;
        reason = "Manually Open";
        manualOverrideState = "open";
        // Calculate background vars just for context
        ramadan = await isRamadan();
        withinHours = isWithinBusinessHours();
    } else {
        // Strict priority 2: Ramadan
        ramadan = await isRamadan();
        if (ramadan) {
            isOpen = false;
            reason = "Closed for Ramadan";
        } else {
            // Strict priority 3: Business Hours
            withinHours = isWithinBusinessHours();
            isOpen = withinHours;
            reason = withinHours
                ? "Open (Tue-Sat, 3PM-12AM)"
                : "Closed (Outside Business Hours)";
        }
    }

    return {
        isOpen,
        reason,
        details: {
            manualOverride: manualOverrideState,
            overrideTimestamp: settings.updated_at,
            isRamadan: ramadan,
            withinBusinessHours: withinHours,
        },
    };
}
