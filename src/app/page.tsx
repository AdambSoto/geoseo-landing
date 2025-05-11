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
import { useState, useRef } from "react";
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

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <HeroGeometric />
      {/* Unified Scroll Animation + Waitlist Section with Shared Squares Background */}
      <section className="relative w-full min-h-[400px] sm:min-h-[800px] bg-black overflow-hidden flex flex-col items-center justify-center px-2 sm:px-0">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Squares className="w-full h-full" />
        </div>
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
                <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-2xl p-2">
                  {/* Image removed for testing */}
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
      {/* Waitlist Section with new text and formatting, but Squares background only */}
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
            <div className="flex flex-col sm:flex-row gap-2 max-w-full sm:max-w-lg mx-auto w-full">
              <form
                className="flex flex-col sm:flex-row gap-2 w-full"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const email = emailRef.current?.value.trim();
                  setError("");
                  setSuccess(false);
                  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                    setError("Please enter a valid email address.");
                    return;
                  }
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/waitlist", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    if (res.ok) {
                      setSuccess(true);
                      setError("");
                      if (emailRef.current) emailRef.current.value = "";
                    } else {
                      const data = await res.json();
                      setError(data.error || "Submission failed. Try again.");
                    }
                  } catch (err) {
                    setError("Network error. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 sm:h-14 bg-gray-950/70 border-gray-700 text-base sm:text-lg text-white placeholder-gray-400 px-4 sm:px-6 w-full"
                  ref={emailRef}
                  disabled={submitting}
                  required
                />
                <Button
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-white text-black text-base sm:text-lg font-bold hover:bg-gray-100 w-full sm:w-auto"
                  variant="ghost"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Get Notified"}
                </Button>
              </form>
            </div>
            {success && (
              <div className="text-green-400 text-center font-semibold mt-2">Successfully Submitted</div>
            )}
            {error && (
              <div className="text-red-400 text-center font-semibold mt-2">{error}</div>
            )}
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