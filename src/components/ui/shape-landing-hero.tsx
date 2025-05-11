"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Squares } from "@/components/ui/squares-background";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}


function HeroGeometric({
    badge = undefined,
    title1 = "If Your Content Isn't Clear to AI,",
    title2 = "It's Invisible to AI.",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    const isMobile = useIsMobile();
    if (isMobile) {
        // Simpler mobile version with moving squares background
        return (
            <div className="relative min-h-[60vh] w-full flex flex-col items-center justify-center bg-[#030303] overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Squares className="w-full h-full" squareSize={32} speed={0.5} borderColor="#333" />
                </div>
                <div className="relative z-10 flex flex-col items-center w-full">
                    <Image
                        src="/GEOSEO_LOGOXL.png"
                        alt="GEOSEO Logo"
                        width={128}
                        height={48}
                        className="w-32 h-12 my-8"
                        priority
                    />
                    <h1 className="text-2xl font-bold text-white text-center mb-4">
                        If Your Content Isn't Clear to AI, It's Invisible to AI.
                    </h1>
                    <p className="text-base text-white/60 text-center max-w-xs mx-auto">
                        GEOSEO helps you optimize your site for modern AI and search engines.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.23, 0.86, 0.39, 0.96] }}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
                <ElegantShape width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
                <ElegantShape width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
                <ElegantShape width={200} height={60} rotate={20} gradient="from-amber-500/[0.15]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
                <ElegantShape width={150} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
            </div>
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <Image src="/GEOSEO_LOGOXL.png" alt="GEOSEO Logo XL" width={220} height={80} className="mx-auto mb-8 mt-8 w-32 h-12 xs:w-40 xs:h-14 sm:w-52 sm:h-20" priority />
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12">
                            <Circle className="h-2 w-2 fill-rose-500/80" />
                            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
                        </div>
                    )}
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{title1}</span>
                        <br />
                        <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ")}>{title2}</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                        Search engines don't see style — they see structure. GEOSEO maps what your site means to modern AI and helps you optimize for maximum visibility.
                    </p>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </motion.div>
    );
}

export { HeroGeometric }
