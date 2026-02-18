// ============================================================
// Restaurant Status Logic
// Manual Override > Ramadan (closed) > Business Hours (auto)
// ============================================================

// In-memory store for manual override
// Persists during warm Vercel function invocations
// Falls back to auto mode on cold start (safe default)
let manualOverride: "open" | "closed" | null = null;
let overrideTimestamp: string | null = null;

export function getManualOverride() {
    return { override: manualOverride, updatedAt: overrideTimestamp };
}

export function setManualOverride(status: "open" | "closed" | null) {
    manualOverride = status;
    overrideTimestamp = status ? new Date().toISOString() : null;
}

// ---- Business Hours (Mon-Fri, 10AM-5PM) ----

export function isWithinBusinessHours(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
    const hour = now.getHours();

    const isWeekday = day >= 1 && day <= 5;
    const isDuringHours = hour >= 10 && hour < 17;

    return isWeekday && isDuringHours;
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
        const result = hijriMonth === 9;

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
    const override = getManualOverride();
    const ramadan = await isRamadan();
    const withinHours = isWithinBusinessHours();

    let isOpen: boolean;
    let reason: string;

    if (override.override !== null) {
        // Manual override takes highest precedence
        isOpen = override.override === "open";
        reason =
            override.override === "open"
                ? "Manually set to Open"
                : "Manually set to Closed";
    } else if (ramadan) {
        // Ramadan — always closed
        isOpen = false;
        reason = "Closed for Ramadan";
    } else {
        // Auto based on business hours
        isOpen = withinHours;
        reason = withinHours
            ? "Within business hours (Mon–Fri, 10AM–5PM)"
            : "Outside business hours";
    }

    return {
        isOpen,
        reason,
        details: {
            manualOverride: override.override,
            overrideTimestamp: override.updatedAt,
            isRamadan: ramadan,
            withinBusinessHours: withinHours,
        },
    };
}
