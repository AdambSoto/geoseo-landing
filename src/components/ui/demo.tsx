"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Squares } from "@/components/ui/squares-background";

export function HeroScrollDemo() {
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
        <div className="relative h-full w-full">
          <Squares className="absolute inset-0 w-full h-full z-0" />
          <Image
            src="/shape-landing-hero.png"
            alt="GEOSEO Hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-contain h-full w-full relative z-10"
            draggable={false}
            priority
          />
        </div>
      </ContainerScroll>
    </div>
  );
} 