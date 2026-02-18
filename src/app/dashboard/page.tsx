"use client";

import { useState, useEffect, useCallback } from "react";

interface RestaurantStatus {
    isOpen: boolean;
    reason: string;
    details: {
        manualOverride: "open" | "closed" | null;
        overrideTimestamp: string | null;
        isRamadan: boolean;
        withinBusinessHours: boolean;
    };
}

export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [status, setStatus] = useState<RestaurantStatus | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Check auth on mount
    useEffect(() => {
        fetch("/api/auth")
            .then((res) => res.json())
            .then((data) => {
                setIsLoggedIn(data.authenticated);
                setIsCheckingAuth(false);
            })
            .catch(() => setIsCheckingAuth(false));
    }, []);

    // Fetch status when logged in
    const fetchStatus = useCallback(async () => {
        try {
            const res = await fetch("/api/status");
            const data = await res.json();
            setStatus(data);
        } catch (err) {
            console.error("Failed to fetch status:", err);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchStatus();
            const interval = setInterval(fetchStatus, 30_000);
            return () => clearInterval(interval);
        }
    }, [isLoggedIn, fetchStatus]);

    // Login handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                setIsLoggedIn(true);
                setUsername("");
                setPassword("");
            } else {
                setLoginError("Invalid username or password");
            }
        } catch {
            setLoginError("Connection error. Please try again.");
        }
    };

    // Logout handler
    const handleLogout = async () => {
        await fetch("/api/auth", { method: "DELETE" });
        setIsLoggedIn(false);
        setStatus(null);
    };

    // Override handler
    const handleOverride = async (
        override: "open" | "closed" | null
    ) => {
        setIsUpdating(true);
        try {
            const res = await fetch("/api/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ override }),
            });
            if (res.ok) {
                const data = await res.json();
                setStatus(data);
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
        setIsUpdating(false);
    };

    // Loading state
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center">
                <div className="text-gold animate-pulse font-heading text-2xl">
                    Loading...
                </div>
            </div>
        );
    }

    // Login form
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
                <div className="w-full max-w-sm">
                    {/* Logo / Title */}
                    <div className="text-center mb-12 flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1000 375.385"
                            className="h-10 w-auto fill-gold mb-3"
                        >
                            <path d="M521.8,472.515A542.6,542.6,0,0,1,501.149,383c-.39-2.176-.78-4.331-1.149-6.507-.369,2.176-.759,4.331-1.149,6.507a542.6,542.6,0,0,1-20.65,89.515c-25.473,78.842-68.578,150.643-128.166,213.433l-1.663,1.724L500,687.59l151.628.082-1.663-1.724C590.377,623.158,547.272,551.357,521.8,472.515Z" transform="translate(0 -312.308)" />
                            <path d="M756.579,583.357l.287-.2.082-.349c7-25.678,13.342-51.911,18.884-77.959,8.847-41.566,15.908-84.034,20.978-126.216l.411-3.366-2.2,2.566a355.663,355.663,0,0,1-116.363,89.186,350.791,350.791,0,0,1-120.531,32.74l-1.375.123.513,1.272a513.052,513.052,0,0,0,79.109,135.146l.41.492.616-.143a314.574,314.574,0,0,0,119.176-53.287Z" transform="translate(0 -312.308)" />
                            <path d="M1000,312.308l-3.079,4.084A393.106,393.106,0,0,1,816.413,450.2l-.575.206q-12.562,74.971-25.1,149.944a354.473,354.473,0,0,1-141.61,46.841l-1.95.226,34.3,39.9.308.369,223.035-.055Z" transform="translate(0 -312.308)" />
                            <path d="M224.168,504.844c5.542,26.048,11.884,52.281,18.884,77.959l.082.349.287.2A314.574,314.574,0,0,0,362.6,636.644l.616.143.41-.492a513.919,513.919,0,0,0,48.3-70.713,511,511,0,0,0,30.81-64.433l.513-1.272-1.375-.123a350.791,350.791,0,0,1-120.531-32.74,355.663,355.663,0,0,1-116.363-89.186l-2.2-2.566.411,3.366C208.26,420.81,215.321,463.278,224.168,504.844Z" transform="translate(0 -312.308)" />
                            <path d="M352.826,647.42l-1.95-.226a354.473,354.473,0,0,1-141.61-46.841q-12.562-74.971-25.1-149.944l-.575-.206A393.106,393.106,0,0,1,3.079,316.392L0,312.308,95.184,687.637l223.035.055.308-.369Z" transform="translate(0 -312.308)" />
                        </svg>
                        <p className="text-cream/40 text-xs uppercase tracking-[0.3em]">
                            Dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-cream/50 text-xs uppercase tracking-[0.2em] mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-charcoal-light/50 border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors duration-300"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <label className="block text-cream/50 text-xs uppercase tracking-[0.2em] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-charcoal-light/50 border border-cream/10 text-cream px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors duration-300"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {loginError && (
                            <p className="text-red-400 text-xs text-center">
                                {loginError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-gold text-charcoal font-heading text-sm uppercase tracking-[0.2em] hover:bg-gold-light transition-colors duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a
                            href="/"
                            className="text-cream/30 text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors duration-300"
                        >
                            ← Back to Website
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard
    return (
        <div className="min-h-screen bg-charcoal">
            {/* Header */}
            <header className="border-b border-cream/10 px-6 md:px-12 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 375.385"
                        className="h-7 w-auto fill-gold"
                    >
                        <path d="M521.8,472.515A542.6,542.6,0,0,1,501.149,383c-.39-2.176-.78-4.331-1.149-6.507-.369,2.176-.759,4.331-1.149,6.507a542.6,542.6,0,0,1-20.65,89.515c-25.473,78.842-68.578,150.643-128.166,213.433l-1.663,1.724L500,687.59l151.628.082-1.663-1.724C590.377,623.158,547.272,551.357,521.8,472.515Z" transform="translate(0 -312.308)" />
                        <path d="M756.579,583.357l.287-.2.082-.349c7-25.678,13.342-51.911,18.884-77.959,8.847-41.566,15.908-84.034,20.978-126.216l.411-3.366-2.2,2.566a355.663,355.663,0,0,1-116.363,89.186,350.791,350.791,0,0,1-120.531,32.74l-1.375.123.513,1.272a513.052,513.052,0,0,0,79.109,135.146l.41.492.616-.143a314.574,314.574,0,0,0,119.176-53.287Z" transform="translate(0 -312.308)" />
                        <path d="M1000,312.308l-3.079,4.084A393.106,393.106,0,0,1,816.413,450.2l-.575.206q-12.562,74.971-25.1,149.944a354.473,354.473,0,0,1-141.61,46.841l-1.95.226,34.3,39.9.308.369,223.035-.055Z" transform="translate(0 -312.308)" />
                        <path d="M224.168,504.844c5.542,26.048,11.884,52.281,18.884,77.959l.082.349.287.2A314.574,314.574,0,0,0,362.6,636.644l.616.143.41-.492a513.919,513.919,0,0,0,48.3-70.713,511,511,0,0,0,30.81-64.433l.513-1.272-1.375-.123a350.791,350.791,0,0,1-120.531-32.74,355.663,355.663,0,0,1-116.363-89.186l-2.2-2.566.411,3.366C208.26,420.81,215.321,463.278,224.168,504.844Z" transform="translate(0 -312.308)" />
                        <path d="M352.826,647.42l-1.95-.226a354.473,354.473,0,0,1-141.61-46.841q-12.562-74.971-25.1-149.944l-.575-.206A393.106,393.106,0,0,1,3.079,316.392L0,312.308,95.184,687.637l223.035.055.308-.369Z" transform="translate(0 -312.308)" />
                    </svg>
                    <p className="text-cream/40 text-[10px] uppercase tracking-[0.3em]">
                        Dashboard
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="/"
                        className="text-cream/40 text-xs uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300"
                    >
                        View Site
                    </a>
                    <button
                        onClick={handleLogout}
                        className="text-cream/40 text-xs uppercase tracking-[0.15em] hover:text-red-400 transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 md:px-12 py-12">
                {/* Current Status Card */}
                <div className="border border-cream/10 p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-heading text-cream text-lg uppercase tracking-[0.15em]">
                            Restaurant Status
                        </h2>
                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-block w-3 h-3 rounded-full ${status?.isOpen
                                    ? "bg-green-500 animate-pulse"
                                    : "bg-red-400"
                                    }`}
                            />
                            <span
                                className={`font-heading text-2xl uppercase tracking-[0.1em] ${status?.isOpen
                                    ? "text-green-500"
                                    : "text-red-400"
                                    }`}
                            >
                                {status?.isOpen ? "Open" : "Closed"}
                            </span>
                        </div>
                    </div>

                    <p className="text-cream/50 text-sm mb-8">
                        {status?.reason || "Loading..."}
                    </p>

                    {/* Override Controls */}
                    <div className="space-y-4">
                        <p className="text-cream/40 text-xs uppercase tracking-[0.2em]">
                            Manual Override
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => handleOverride("open")}
                                disabled={isUpdating}
                                className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-heading transition-all duration-300 border ${status?.details.manualOverride === "open"
                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                    : "border-cream/20 text-cream/50 hover:border-green-500 hover:text-green-400"
                                    } disabled:opacity-50`}
                            >
                                Force Open
                            </button>
                            <button
                                onClick={() => handleOverride(null)}
                                disabled={isUpdating}
                                className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-heading transition-all duration-300 border ${status?.details.manualOverride === null
                                    ? "bg-gold/20 border-gold text-gold"
                                    : "border-cream/20 text-cream/50 hover:border-gold hover:text-gold"
                                    } disabled:opacity-50`}
                            >
                                Auto
                            </button>
                            <button
                                onClick={() => handleOverride("closed")}
                                disabled={isUpdating}
                                className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-heading transition-all duration-300 border ${status?.details.manualOverride === "closed"
                                    ? "bg-red-500/20 border-red-500 text-red-400"
                                    : "border-cream/20 text-cream/50 hover:border-red-500 hover:text-red-400"
                                    } disabled:opacity-50`}
                            >
                                Force Closed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Hours */}
                    <div className="border border-cream/10 p-6">
                        <h3 className="font-heading text-cream text-sm uppercase tracking-[0.15em] mb-4">
                            Business Hours
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-cream/50">
                                    Monday – Friday
                                </span>
                                <span className="text-cream/80">
                                    10:00 AM – 5:00 PM
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-cream/50">
                                    Saturday – Sunday
                                </span>
                                <span className="text-red-400/70">Closed</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-cream/5">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-block w-1.5 h-1.5 rounded-full ${status?.details.withinBusinessHours
                                        ? "bg-green-500"
                                        : "bg-red-400"
                                        }`}
                                />
                                <span className="text-cream/40 text-xs">
                                    Currently{" "}
                                    {status?.details.withinBusinessHours
                                        ? "within"
                                        : "outside"}{" "}
                                    business hours
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Ramadan Status */}
                    <div className="border border-cream/10 p-6">
                        <h3 className="font-heading text-cream text-sm uppercase tracking-[0.15em] mb-4">
                            Ramadan Status
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className={`inline-block w-2 h-2 rounded-full ${status?.details.isRamadan
                                    ? "bg-amber-400 animate-pulse"
                                    : "bg-cream/20"
                                    }`}
                            />
                            <span
                                className={`text-sm ${status?.details.isRamadan
                                    ? "text-amber-400"
                                    : "text-cream/50"
                                    }`}
                            >
                                {status?.details.isRamadan
                                    ? "It is currently Ramadan — restaurant auto-closes"
                                    : "Not currently Ramadan"}
                            </span>
                        </div>
                        <p className="text-cream/30 text-xs">
                            Ramadan detection is automatic via Aladhan API
                            (Kuala Lumpur, Malaysia timezone).
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 p-4 border border-cream/5 bg-cream/5">
                    <p className="text-cream/30 text-xs leading-relaxed">
                        <strong className="text-cream/50">Note:</strong> Manual
                        override takes priority over all automatic rules.
                        Setting to &quot;Auto&quot; returns control to the
                        business hours and Ramadan schedule. Override state
                        persists while the server is warm and resets to Auto on
                        cold restart.
                    </p>
                </div>
            </main>
        </div>
    );
}
