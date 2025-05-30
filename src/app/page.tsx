"use client";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Squares } from "@/components/ui/squares-background";
import { FluidParticles } from "@/components/ui/fluid-particle";
import { SplashCursor } from "@/components/ui/splash-cursor";
import Hero from '@/components/Hero'
import WaitlistForm from '@/components/WaitlistForm'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { GlowEffect } from "@/components/ui/glow-effect";
import { GridBackground } from "@/components/ui/grid-background";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Twitter, Github } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import React from "react";

// Hook to detect if the device is mobile (width < 640px)
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

function ErrorBoundary({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  return hasError ? fallback : (
    <React.Suspense fallback={fallback}>
      {React.cloneElement(children as React.ReactElement, { onError: () => setHasError(true) })}
    </React.Suspense>
  );
}

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = React.useState(false);
  const [showToast, setShowToast] = useState(false);
  React.useEffect(() => setMounted(true), []);

  const handleWaitlistSubmit = async (email: string) => {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Submission failed");
    }
  };

  if (isMobile) {
    const [showLoom, setShowLoom] = useState(false);
    return (
      <main className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center">
        <div className="w-full flex flex-col items-center pt-8 pb-4">
          <img src="/GEOSEO_LOGO_sm.png" alt="GEOSEO Logo" className="w-24 h-auto mx-auto mb-4" />
          <div className="text-center mb-6 px-4">
            <h1 className="text-2xl font-bold text-white mb-2">If Your Content Isn't Clear to AI,<br />It's Invisible to AI.</h1>
            <p className="text-white/80 text-base max-w-md mx-auto">Search engines don't see style — they see structure. GEOSEO maps what your site means to modern AI and helps you optimize for maximum visibility.</p>
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700 mb-6 flex items-center justify-center bg-gray-900">
          {!showLoom ? (
            <button
              className="relative w-full h-full flex items-center justify-center focus:outline-none"
              style={{ minHeight: 120 }}
              onClick={() => setShowLoom(true)}
              aria-label="Play product demo video"
            >
              <img src="/loom-mobile-placeholder.jpg" alt="Product Demo Preview" className="w-full h-full object-contain" />
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-white/90 bg-black/60 rounded-full p-3 shadow-lg" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.3"/><polygon points="20,16 34,24 20,32" fill="white"/></svg>
              </span>
            </button>
          ) : mounted ? (
            <ErrorBoundary fallback={<img src="/loom-mobile-placeholder.jpg" alt="Product Demo Preview" className="w-full h-full object-contain" style={{ minHeight: 120 }} />}>
              <iframe
                src="https://www.loom.com/embed/e9eeb3b1dae7429c9772e4c97ef586cb?sid=0b335602-e48e-4249-a353-3ae72ea6d1db"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full min-h-[120px]"
                style={{ display: 'block' }}
              />
            </ErrorBoundary>
          ) : (
            <img src="/loom-mobile-placeholder.jpg" alt="Product Demo Preview" className="w-full h-full object-contain" style={{ minHeight: 120 }} />
          )}
        </div>
        <section className="relative w-full flex flex-col items-center justify-center min-h-[400px] py-12 px-2">
          <div className="relative z-10 flex items-center justify-center w-full min-h-[300px]">
            <div className="w-full max-w-full mx-auto p-2 space-y-8 flex flex-col items-center justify-center">
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-extrabold text-center text-white">
                  Join Our Product Launch Waitlist
                </h2>
                <p className="text-base text-white max-w-2xl mx-auto">
                  Be part of something truly extraordinary. Join thousands of others already gaining early access to our revolutionary new product.
                </p>
              </div>
              <WaitlistForm onSubmit={handleWaitlistSubmit} />
            </div>
          </div>
        </section>
        {mounted && (
          <ErrorBoundary fallback={null}>
            <div className="fixed inset-0 pointer-events-none z-50">
              <SplashCursor />
            </div>
          </ErrorBoundary>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {!isMobile && <HeroGeometric />}
      <section className="relative w-full min-h-[400px] sm:min-h-[800px] bg-black overflow-hidden flex flex-col items-center justify-center px-2 sm:px-0">
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Squares className="w-full h-full" />
          </div>
        )}
        <div className="relative z-10 flex flex-col items-center w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-center text-white">
                  See Your GEO Dashboard in Action
                </h2>
                <p className="text-base xs:text-lg sm:text-lg md:text-xl text-white text-center max-w-2xl mx-auto">
                  Experience the power of AI-driven content optimization and analytics for your business.
                </p>
              </>
            }
          >
            <div className="w-full h-full relative flex-1 max-w-full sm:max-w-5xl min-h-[200px] sm:min-h-[500px] md:min-h-[650px] mx-auto flex items-center justify-center">
              {!mounted ? null : isMobile ? (
                <div className="flex items-center justify-center w-full h-full bg-black rounded-2xl p-8">
                  <span className="text-white text-lg text-center">Welcome to GEOSEO (Mobile Safe Mode)</span>
                </div>
              ) : (
                <iframe
                  src="https://www.loom.com/embed/e9eeb3b1dae7429c9772e4c97ef586cb?sid=0b335602-e48e-4249-a353-3ae72ea6d1db"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  style={{ display: 'block' }}
                />
              )}
            </div>
          </ContainerScroll>
        </div>
      </section>
      <section className="relative w-full flex flex-col items-center justify-center min-h-[400px] sm:min-h-[700px] py-12 sm:py-32 px-2 sm:px-0">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Squares className="w-full h-full" />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full min-h-[300px] sm:min-h-[600px]">
          <div className="w-full max-w-full sm:max-w-2xl mx-auto p-2 sm:p-8 space-y-8 sm:space-y-16 flex flex-col items-center justify-center">
            <div className="space-y-4 sm:space-y-8 text-center">
              <h2 className="text-2xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-center text-white">
                Join Our Product Launch Waitlist
              </h2>
              <p className="text-base xs:text-lg sm:text-2xl text-gray-200 max-w-2xl mx-auto">
                Be part of something truly extraordinary. Join thousands of others already gaining early access to our revolutionary new product.
              </p>
            </div>
            <WaitlistForm onSubmit={handleWaitlistSubmit} />
            <div className="flex flex-col items-center gap-6 sm:gap-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex -space-x-3 sm:-space-x-4">
                  <Avatar className="border-2 w-10 h-10 sm:w-16 sm:h-16">
                    <AvatarFallback className="text-base sm:text-lg font-semibold border-white/20 bg-purple-600">JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 w-10 h-10 sm:w-16 sm:h-16">
                    <AvatarFallback className="text-base sm:text-lg font-semibold border-white/20 bg-blue-600">AS</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 w-10 h-10 sm:w-16 sm:h-16">
                    <AvatarFallback className="text-base sm:text-lg font-semibold border-white/20 bg-blue-700">MK</AvatarFallback>
                  </Avatar>
                </div>
                <span className="font-bold text-base sm:text-2xl text-white bg-black/40 rounded-lg px-3 py-1 sm:px-4 sm:py-2 mt-2 sm:mt-0">100+ people on the waitlist</span>
              </div>
              <div className="flex gap-6 sm:gap-10 justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white"
                >
                  <Twitter className="w-5 h-5 sm:w-7 sm:h-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white"
                >
                  <Github className="w-5 h-5 sm:w-7 sm:h-7" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed inset-0 pointer-events-none">
        <SplashCursor />
      </div>
    </main>
  )
} 