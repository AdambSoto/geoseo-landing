"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Squares } from "@/components/ui/squares-background";

// Mobile detection hook
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

export function HeroScrollDemo() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <section className="relative w-full flex flex-col items-center justify-center min-h-[600px] py-12 sm:py-24 overflow-hidden">
        <Squares className="absolute inset-0 w-full h-full z-0" />
        <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto px-4 gap-8">
          <Image
            src="/shape-landing-hero.png"
            alt="GEOSEO Hero"
            height={400}
            width={800}
            className="mx-auto rounded-2xl object-contain w-full max-w-xl h-auto"
            draggable={false}
            priority
          />
          <div className="w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700">
            <iframe
              src="https://www.loom.com/embed/e9eeb3b1dae7429c9772e4c97ef586cb?sid=0b335602-e48e-4249-a353-3ae72ea6d1db"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full min-h-[200px]"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </section>
    );
  }
  // Desktop: original ContainerScroll demo
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-[1000px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
} 