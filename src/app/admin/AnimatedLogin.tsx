"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Eye, EyeOff } from "lucide-react";

interface PupilProps {
    size?: number;
    maxDistance?: number;
    pupilColor?: string;
    forceLookX?: number;
    forceLookY?: number;
}

const Pupil = ({
    size = 12,
    maxDistance = 5,
    pupilColor = "black",
    forceLookX,
    forceLookY
}: PupilProps) => {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const pupilRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const calculatePupilPosition = () => {
        if (!pupilRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const pupil = pupilRef.current.getBoundingClientRect();
        const pupilCenterX = pupil.left + pupil.width / 2;
        const pupilCenterY = pupil.top + pupil.height / 2;

        const deltaX = mouseX - pupilCenterX;
        const deltaY = mouseY - pupilCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={pupilRef}
            className="rounded-full"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: pupilColor,
                transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        />
    );
};

interface EyeBallProps {
    size?: number;
    pupilSize?: number;
    maxDistance?: number;
    eyeColor?: string;
    pupilColor?: string;
    isBlinking?: boolean;
    forceLookX?: number;
    forceLookY?: number;
}

const EyeBall = ({
    size = 48,
    pupilSize = 16,
    maxDistance = 10,
    eyeColor = "white",
    pupilColor = "black",
    isBlinking = false,
    forceLookX,
    forceLookY
}: EyeBallProps) => {
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const eyeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const calculatePupilPosition = () => {
        if (!eyeRef.current) return { x: 0, y: 0 };

        if (forceLookX !== undefined && forceLookY !== undefined) {
            return { x: forceLookX, y: forceLookY };
        }

        const eye = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return { x, y };
    };

    const pupilPosition = calculatePupilPosition();

    return (
        <div
            ref={eyeRef}
            className="rounded-full flex items-center justify-center transition-all duration-150"
            style={{
                width: `${size}px`,
                height: isBlinking ? '2px' : `${size}px`,
                backgroundColor: eyeColor,
                overflow: 'hidden',
            }}
        >
            {!isBlinking && (
                <div
                    className="rounded-full"
                    style={{
                        width: `${pupilSize}px`,
                        height: `${pupilSize}px`,
                        backgroundColor: pupilColor,
                        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                        transition: 'transform 0.1s ease-out',
                    }}
                />
            )}
        </div>
    );
};

export const LogoComponent = () => (
    <div className="flex justify-center w-full">
        {/* Exact Logo from NavBar */}
        <div className="w-16 h-16 flex items-center justify-center">
            <svg
                viewBox="0 0 1000 859.54"
                className="w-full h-auto drop-shadow-sm"
            >
                <defs>
                    <linearGradient id={`nav-linear-gradient-login`} x1="806.82" y1="-67.77" x2="806.82" y2="505.3" gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#d4af37" />
                        <stop offset="0.55" stopColor="#eabf47" />
                        <stop offset="1" stopColor="#ffd38e" />
                    </linearGradient>
                    <linearGradient id={`nav-linear-gradient-2-login`} x1="500" y1="59.79" x2="500" y2="791.77" gradientTransform="matrix(1, 0, 0, -1, 0, 791.77)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#d4af37" />
                        <stop offset="0.29" stopColor="#eabf47" />
                        <stop offset="1" stopColor="#ffd38e" />
                    </linearGradient>
                    <linearGradient id={`nav-linear-gradient-3-login`} x1="193.18" y1="-67.77" x2="193.18" y2="505.3" xlinkHref={`#nav-linear-gradient-login`} />
                </defs>
                <g id={`Logo_Nav_login`}>
                    <path d="M967.79,598.33c-18.94,56.63-39.65,95.76-54.48,119.34-31.18,49.6-61.18,97.32-117.86,123.59-76.9,35.64-155.66,9.9-181.82,0a316.93,316.93,0,0,0,90.91-22.73c132.81-55.35,184.33-186,196.41-220.2,10.27-29.09,22.46-74.78,22.3-133.66a642.06,642.06,0,0,1-59.61,45.84V424.44a601.67,601.67,0,0,0,126.43-138C1000.63,346,1013,463.3,967.79,598.33Z" style={{ fill: `url(#nav-linear-gradient-login)` }} />
                    <path d="M767.32,642.89a500.18,500.18,0,0,1-59.75-55.37,627.5,627.5,0,0,0,82-33.75c9.91-4.91,19.43-10,28.59-15.11V457.25A584.07,584.07,0,0,1,767.32,487a595.12,595.12,0,0,1-105.68,42.48C605.16,446.77,566.82,331,566.82,331,525,204.57,507.7,84.18,500,0c-7.7,84.18-25,204.57-66.82,331,0,0-38.34,115.75-94.82,198.41A594.36,594.36,0,0,1,232.68,487a581.54,581.54,0,0,1-50.86-29.7v81.41q13.74,7.71,28.59,15.12a628.89,628.89,0,0,0,82,33.75,500.09,500.09,0,0,1-59.75,55.36,515.83,515.83,0,0,1-66.82,44.55L210.41,732A716.15,716.15,0,0,0,350.5,603.77a672.71,672.71,0,0,0,299,0A715.79,715.79,0,0,0,789.59,732l44.55-44.54A515.76,515.76,0,0,1,767.32,642.89ZM500,553.77a597.66,597.66,0,0,1-104.39-10.52c22.39-35.11,43.5-82,82.12-167.68a301.5,301.5,0,0,0,10.8-29c5.47-17.06,11-39.36,11.47-60.16.45,20.8,6,43.1,11.48,60.16a298.85,298.85,0,0,0,10.8,29c38.61,85.7,59.72,132.57,82.11,167.68A597.66,597.66,0,0,1,500,553.77Z" style={{ fill: `url(#nav-linear-gradient-2-login)` }} />
                    <path d="M32.21,598.33C51.15,655,71.86,694.09,86.69,717.67c31.18,49.6,61.18,97.32,117.86,123.59,76.9,35.64,155.66,9.9,181.82,0a316.93,316.93,0,0,1-90.91-22.73c-132.81-55.35-184.33-186-196.41-220.2a396.48,396.48,0,0,1-22.3-133.66,642.2,642.2,0,0,0,59.62,45.84V424.44a601.49,601.49,0,0,1-126.44-138C-.63,346-12.95,463.3,32.21,598.33Z" style={{ fill: `url(#nav-linear-gradient-3-login)` }} />
                </g>
            </svg>
        </div>
    </div>
);

interface AnimatedLoginProps {
    emailState: [string, React.Dispatch<React.SetStateAction<string>>];
    passwordState: [string, React.Dispatch<React.SetStateAction<string>>];
    loadingAuth: boolean;
    onLogin: (e: React.FormEvent) => void;
    errorMsg?: string;
}

export default function AnimatedLogin({
    emailState,
    passwordState,
    loadingAuth,
    onLogin,
    errorMsg
}: AnimatedLoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = emailState;
    const [password, setPassword] = passwordState;

    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
    const [isBlackBlinking, setIsBlackBlinking] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
    const [isPurplePeeking, setIsPurplePeeking] = useState(false);

    const purpleRef = useRef<HTMLDivElement>(null);
    const blackRef = useRef<HTMLDivElement>(null);
    const yellowRef = useRef<HTMLDivElement>(null);
    const orangeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsPurpleBlinking(true);
                setTimeout(() => {
                    setIsPurpleBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());
            return blinkTimeout;
        };
        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
        const scheduleBlink = () => {
            const blinkTimeout = setTimeout(() => {
                setIsBlackBlinking(true);
                setTimeout(() => {
                    setIsBlackBlinking(false);
                    scheduleBlink();
                }, 150);
            }, getRandomBlinkInterval());
            return blinkTimeout;
        };
        const timeout = scheduleBlink();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (isTyping) {
            setIsLookingAtEachOther(true);
            const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
            return () => clearTimeout(timer);
        } else {
            setIsLookingAtEachOther(false);
        }
    }, [isTyping]);

    useEffect(() => {
        if (password.length > 0 && showPassword) {
            const schedulePeek = () => {
                const peekInterval = setTimeout(() => {
                    setIsPurplePeeking(true);
                    setTimeout(() => setIsPurplePeeking(false), 800);
                }, Math.random() * 3000 + 2000);
                return peekInterval;
            };
            const firstPeek = schedulePeek();
            return () => clearTimeout(firstPeek);
        } else {
            setIsPurplePeeking(false);
        }
    }, [password, showPassword, isPurplePeeking]);

    const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return { faceX: 0, faceY: 0, bodyRotation: 0 };
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const faceX = Math.max(-15, Math.min(15, deltaX / 20));
        const faceY = Math.max(-10, Math.min(10, deltaY / 30));
        const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
        return { faceX, faceY, bodySkew };
    };

    const purplePos = calculatePosition(purpleRef);
    const blackPos = calculatePosition(blackRef);
    const yellowPos = calculatePosition(yellowRef);
    const orangePos = calculatePosition(orangeRef);

    return (
        <div className="absolute inset-0 grid lg:grid-cols-2 bg-[#0F0F0F] font-sans z-[5000]">
            {/* Left Content Section */}
            <div className="relative hidden lg:flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#EAEAEA] to-[#D1D1D1] p-12 text-charcoal">
                <div className="relative z-20 flex items-end justify-center h-[500px]">
                    {/* Cartoon Characters */}
                    <div className="relative" style={{ width: '550px', height: '400px' }}>
                        {/* Purple tall rectangle */}
                        <div
                            ref={purpleRef}
                            className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: '70px',
                                width: '180px',
                                height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
                                backgroundColor: '#6C3FF5',
                                borderRadius: '10px 10px 0 0',
                                zIndex: 1,
                                transform: (password.length > 0 && showPassword)
                                    ? `skewX(0deg)`
                                    : (isTyping || (password.length > 0 && !showPassword))
                                        ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                                        : `skewX(${purplePos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            <div
                                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                                style={{
                                    left: (password.length > 0 && showPassword) ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                                    top: (password.length > 0 && showPassword) ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                                }}
                            >
                                <EyeBall size={18} pupilSize={7} maxDistance={5} isBlinking={isPurpleBlinking}
                                    forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                                    forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                                />
                                <EyeBall size={18} pupilSize={7} maxDistance={5} isBlinking={isPurpleBlinking}
                                    forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                                    forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                                />
                            </div>
                        </div>

                        {/* Black rectangle */}
                        <div
                            ref={blackRef}
                            className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: '240px',
                                width: '120px',
                                height: '310px',
                                backgroundColor: '#2D2D2D',
                                borderRadius: '8px 8px 0 0',
                                zIndex: 2,
                                transform: (password.length > 0 && showPassword)
                                    ? `skewX(0deg)`
                                    : isLookingAtEachOther
                                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                                        : (isTyping || (password.length > 0 && !showPassword))
                                            ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                                            : `skewX(${blackPos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            <div
                                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                                style={{
                                    left: (password.length > 0 && showPassword) ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                                    top: (password.length > 0 && showPassword) ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                                }}
                            >
                                <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={isBlackBlinking}
                                    forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                                    forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                                />
                                <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={isBlackBlinking}
                                    forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                                    forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                                />
                            </div>
                        </div>

                        {/* Orange semi-circle */}
                        <div
                            ref={orangeRef}
                            className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: '0px',
                                width: '240px',
                                height: '200px',
                                zIndex: 3,
                                backgroundColor: '#FF9B6B',
                                borderRadius: '120px 120px 0 0',
                                transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            <div
                                className="absolute flex gap-8 transition-all duration-200 ease-out"
                                style={{
                                    left: (password.length > 0 && showPassword) ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                                    top: (password.length > 0 && showPassword) ? `${85}px` : `${90 + (orangePos.faceY || 0)}px`,
                                }}
                            >
                                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                            </div>
                        </div>

                        {/* Yellow tall rectangle */}
                        <div
                            ref={yellowRef}
                            className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: '310px',
                                width: '140px',
                                height: '230px',
                                backgroundColor: '#E8D754',
                                borderRadius: '70px 70px 0 0',
                                zIndex: 4,
                                transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                                transformOrigin: 'bottom center',
                            }}
                        >
                            <div
                                className="absolute flex gap-6 transition-all duration-200 ease-out"
                                style={{
                                    left: (password.length > 0 && showPassword) ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                                    top: (password.length > 0 && showPassword) ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                                }}
                            >
                                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                            </div>
                            <div
                                className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                                style={{
                                    left: (password.length > 0 && showPassword) ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                                    top: (password.length > 0 && showPassword) ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Login Section */}
            <div className="flex items-center justify-center p-8 bg-[#0F0F0F] relative z-10 text-white">
                <div className="w-full max-w-[380px]">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <LogoComponent />
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-[28px] tracking-tight text-white mb-2 font-body font-medium">Welcome Boss</h1>
                        <p className="text-white/40 text-sm">Please enter your details</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={onLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-semibold text-white/90">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="boss@takanajuo.com"
                                value={email}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                required
                                className="h-11 bg-transparent border-white/10 rounded-lg text-sm placeholder:text-white/30 focus-visible:border-white/30"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-xs font-semibold text-white/90">Password</Label>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="*********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 bg-transparent border-white/10 rounded-lg text-sm placeholder:text-white/30 pr-10 focus-visible:border-white/30 tracking-widest font-mono pt-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end items-center pt-2">
                            <a href="#" className="text-xs text-white/80 hover:text-white transition-colors font-semibold">Forgot password?</a>
                        </div>

                        {errorMsg && (
                            <div className="p-3 text-sm text-red-300 bg-red-950/40 border border-red-900/30 rounded-lg backdrop-blur-md">
                                {errorMsg}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 text-sm font-semibold mt-6 bg-[#E8E8E8] text-black btn-gold-hover rounded-lg transition-all duration-300"
                            size="lg"
                            disabled={loadingAuth}
                        >
                            {loadingAuth ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                </div>
            </div>
        </div>
    );
}
