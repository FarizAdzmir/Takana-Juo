"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RevealText } from "@/components/UI/Reveal";
import AnimatedLogin from "./AnimatedLogin";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Button } from "@/components/UI/Button";
import { X, Edit2 } from "lucide-react";

/* Mini Custom Logo ensuring perfect text alignment */
const AdminMiniLogo = () => (
    <svg viewBox="0 0 1000 859.54" className="w-9 h-9 drop-shadow-sm filter brightness-150 shrink-0">
        <defs>
            <linearGradient id={`admin-mini-gradient`} x1="806.82" y1="-67.77" x2="806.82" y2="505.3" gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#d4af37" />
                <stop offset="0.55" stopColor="#eabf47" />
                <stop offset="1" stopColor="#ffd38e" />
            </linearGradient>
            <linearGradient id={`admin-mini-gradient-2`} x1="500" y1="59.79" x2="500" y2="791.77" gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#d4af37" />
                <stop offset="0.29" stopColor="#eabf47" />
                <stop offset="1" stopColor="#ffd38e" />
            </linearGradient>
            <linearGradient id={`admin-mini-gradient-3`} x1="193.18" y1="-67.77" x2="193.18" y2="505.3" xlinkHref={`#admin-mini-gradient`} />
        </defs>
        <g>
            <path d="M967.79,598.33c-18.94,56.63-39.65,95.76-54.48,119.34-31.18,49.6-61.18,97.32-117.86,123.59-76.9,35.64-155.66,9.9-181.82,0a316.93,316.93,0,0,0,90.91-22.73c132.81-55.35,184.33-186,196.41-220.2,10.27-29.09,22.46-74.78,22.3-133.66a642.06,642.06,0,0,1-59.61,45.84V424.44a601.67,601.67,0,0,0,126.43-138C1000.63,346,1013,463.3,967.79,598.33Z" style={{ fill: `url(#admin-mini-gradient)` }} />
            <path d="M767.32,642.89a500.18,500.18,0,0,1-59.75-55.37,627.5,627.5,0,0,0,82-33.75c9.91-4.91,19.43-10,28.59-15.11V457.25A584.07,584.07,0,0,1,767.32,487a595.12,595.12,0,0,1-105.68,42.48C605.16,446.77,566.82,331,566.82,331,525,204.57,507.7,84.18,500,0c-7.7,84.18-25,204.57-66.82,331,0,0-38.34,115.75-94.82,198.41A594.36,594.36,0,0,1,232.68,487a581.54,581.54,0,0,1-50.86-29.7v81.41q13.74,7.71,28.59,15.12a628.89,628.89,0,0,0,82,33.75,500.09,500.09,0,0,1-59.75,55.36,515.83,515.83,0,0,1-66.82,44.55L210.41,732A716.15,716.15,0,0,0,350.5,603.77a672.71,672.71,0,0,0,299,0A715.79,715.79,0,0,0,789.59,732l44.55-44.54A515.76,515.76,0,0,1,767.32,642.89ZM500,553.77a597.66,597.66,0,0,1-104.39-10.52c22.39-35.11,43.5-82,82.12-167.68a301.5,301.5,0,0,0,10.8-29c5.47-17.06,11-39.36,11.47-60.16.45,20.8,6,43.1,11.48,60.16a298.85,298.85,0,0,0,10.8,29c38.61,85.7,59.72,132.57,82.11,167.68A597.66,597.66,0,0,1,500,553.77Z" style={{ fill: `url(#admin-mini-gradient-2)` }} />
            <path d="M32.21,598.33C51.15,655,71.86,694.09,86.69,717.67c31.18,49.6,61.18,97.32,117.86,123.59,76.9,35.64,155.66,9.9,181.82,0a316.93,316.93,0,0,1-90.91-22.73c-132.81-55.35-184.33-186-196.41-220.2a396.48,396.48,0,0,1-22.3-133.66,642.2,642.2,0,0,0,59.62,45.84V424.44a601.49,601.49,0,0,1-126.44-138C-.63,346-12.95,463.3,32.21,598.33Z" style={{ fill: `url(#admin-mini-gradient-3)` }} />
        </g>
    </svg>
)

export default function AdminPage() {
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const [storeStatus, setStoreStatus] = useState<any>(null);
    const [loadingStatus, setLoadingStatus] = useState(true);

    // Edit Modal State
    const [editingItem, setEditingItem] = useState<any>(null);
    const [editForm, setEditForm] = useState({ main: "", sub: "", price: "", image: "" });
    const [isSaving, setIsSaving] = useState(false);

    // Check active session on mount
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch live prices and status if logged in
    useEffect(() => {
        if (!session) return;
        const fetchData = async () => {
            setLoadingData(true);

            // 1. Fetch Menu Items
            const { data: menuData, error: menuError } = await supabase
                .from("menu_items")
                .select("*")
                .order("id");
            if (menuError) console.error(menuError);
            else setMenuItems(menuData || []);

            // 2. Fetch Store Status
            try {
                const res = await fetch("/api/status", { cache: "no-store" });
                const statusData = await res.json();
                setStoreStatus(statusData);
            } catch (e) {
                console.error("Failed to fetch status", e);
            }

            setLoadingData(false);
            setLoadingStatus(false);
        };
        fetchData();
    }, [session]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoadingAuth(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setErrorMsg(error.message);
        setLoadingAuth(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const openEditModal = (item: any) => {
        setEditingItem(item);
        setEditForm({ main: item.main, sub: item.sub, price: item.price, image: item.image || "" });
    };

    const closeEditModal = () => {
        setEditingItem(null);
    };

    const saveEditItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;
        setIsSaving(true);

        const { error } = await supabase
            .from("menu_items")
            .update({
                main: editForm.main,
                sub: editForm.sub,
                price: editForm.price,
                image: editForm.image
            })
            .eq("id", editingItem.id);

        if (error) {
            alert("Failed to update item.");
            console.error(error);
        } else {
            setMenuItems((prev) =>
                prev.map((item) => (item.id === editingItem.id ? { ...item, ...editForm } : item))
            );
            closeEditModal();
        }
        setIsSaving(false);
    };

    const updateStoreStatus = async (override: "open" | "closed" | "auto") => {
        setLoadingStatus(true);
        try {
            const emergency_closed = override === "closed";
            const force_open = override === "open";

            const { error: updateError } = await supabase
                .from("store_settings")
                .update({
                    emergency_closed,
                    force_open,
                    updated_at: new Date().toISOString()
                })
                .eq("id", 1);

            if (updateError) throw new Error(updateError.message);

            // Fetch newly calculated status to update the UI
            const res = await fetch("/api/status", { cache: "no-store" });
            const newStatus = await res.json();
            setStoreStatus(newStatus);
        } catch (e: any) {
            console.error("Failed to update store status", e);
            alert("Failed to update store status: " + e.message);
        }
        setLoadingStatus(false);
    };

    if (!session) {
        return (
            <AnimatedLogin
                emailState={[email, setEmail]}
                passwordState={[password, setPassword]}
                loadingAuth={loadingAuth}
                onLogin={handleLogin}
                errorMsg={errorMsg}
            />
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20 admin-root overflow-x-hidden">
            <style>{`
                .admin-root, .admin-root * {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
                    border-radius: 0 !important;
                }
                .status-dot {
                    border-radius: 9999px !important;
                }
            `}</style>
            {/* Minimal Top-Left Navigation Header (Glass) */}
            <div className="flex items-center gap-3.5 px-8 py-5 border-b border-white/10 bg-white/5 backdrop-blur-md relative z-50">
                <AdminMiniLogo />
                <h1 className="text-xl font-medium tracking-wide" style={{ transform: "translateY(2px)" }}>Dashboard</h1>
                <div className="ml-auto">
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/20 px-3 py-1.5"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-12 px-6 space-y-12">
                {loadingData ? (
                    <div className="text-center py-20 text-white/50 animate-pulse">Loading dashboard elements...</div>
                ) : (
                    <>
                        {/* Status Management Panel (Vertical Stack, Glass) */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 flex flex-col justify-center items-center text-center">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Store Operating Status</h2>

                            {loadingStatus || !storeStatus ? (
                                <div className="text-white/50 text-sm animate-pulse mb-8">Calculating status...</div>
                            ) : (
                                <div className="mb-10">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <div className={`w-3 h-3 status-dot ${storeStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                        <span className={`text-4xl font-bold tracking-tight ${storeStatus.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                            {storeStatus.isOpen ? 'OPEN' : 'CLOSED'}
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-sm mt-2">{storeStatus.reason}</p>
                                </div>
                            )}

                            <div className="flex w-full max-w-md bg-black/40 p-1.5 border border-white/10 gap-1.5">
                                <button
                                    onClick={() => updateStoreStatus("open")}
                                    disabled={loadingStatus}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${storeStatus?.details?.manualOverride === "open" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"}`}
                                >
                                    Force Open
                                </button>
                                <button
                                    onClick={() => updateStoreStatus("auto")}
                                    disabled={loadingStatus}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${storeStatus?.details?.manualOverride === null ? "bg-white/10 text-white border border-white/20" : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"}`}
                                >
                                    Auto
                                </button>
                                <button
                                    onClick={() => updateStoreStatus("closed")}
                                    disabled={loadingStatus}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${storeStatus?.details?.manualOverride === "closed" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"}`}
                                >
                                    Force Close
                                </button>
                            </div>
                        </div>

                        {/* Menu Items (Traditional Table with Rows, Glass) */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-black/40">
                                        <th className="p-2 sm:p-5 text-xs font-semibold uppercase tracking-wider text-white/50">Menu</th>
                                        <th className="p-2 sm:p-5 text-xs font-semibold uppercase tracking-wider text-white/50 w-20 sm:w-32">Price</th>
                                        <th className="p-2 sm:p-5 text-xs font-semibold uppercase tracking-wider text-white/50 w-16 sm:w-28 text-right">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuItems.map((item) => (
                                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                            <td className="p-2 sm:p-5">
                                                <div className="flex items-center gap-2 sm:gap-4">
                                                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black/50 overflow-hidden flex-shrink-0 border border-white/5 p-1">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={item.image} alt={item.sub} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-sm sm:text-lg leading-tight mb-0.5">{item.main}</div>
                                                        {item.sub !== 'Biasa' && (
                                                            <div className="text-xs sm:text-sm text-white/40">{item.sub}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 sm:p-5 text-sm sm:text-lg font-medium tracking-wide">
                                                {item.price}
                                            </td>
                                            <td className="p-2 sm:p-5 text-right">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="bg-white/10 hover:bg-white text-white hover:text-black px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all font-medium flex items-center justify-center gap-1 sm:gap-2 ml-auto"
                                                >
                                                    <Edit2 size={14} />
                                                    <span className="hidden sm:inline">Edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* Edit Modal Overlay */}
            {editingItem && (
                <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#111] border border-white/10 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-black/50">
                            <h3 className="text-lg font-medium tracking-wide">Edit Menu Item</h3>
                            <button onClick={closeEditModal} className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 border border-transparent">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={saveEditItem} className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="main" className="text-xs text-white/50 uppercase tracking-wider">Main Name</Label>
                                    <Input
                                        id="main"
                                        value={editForm.main}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, main: e.target.value }))}
                                        className="h-12 bg-black border-white/10 focus-visible:border-white/30 text-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sub" className="text-xs text-white/50 uppercase tracking-wider">Variation (Sub)</Label>
                                    <Input
                                        id="sub"
                                        value={editForm.sub}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, sub: e.target.value }))}
                                        className="h-12 bg-black border-white/10 focus-visible:border-white/30 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-xs text-white/50 uppercase tracking-wider">Price</Label>
                                    <Input
                                        id="price"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="e.g. RM 4.00"
                                        className="h-12 bg-black border-white/10 focus-visible:border-white/30 text-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-xs text-white/50 uppercase tracking-wider">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={editForm.image}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                                        className="h-12 bg-black border-white/10 focus-visible:border-white/30 text-white"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12 border-white/10 text-white hover:bg-white/5"
                                    onClick={closeEditModal}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 bg-white text-black hover:bg-white/90 font-medium"
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
