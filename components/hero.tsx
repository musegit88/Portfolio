import { Suspense } from "react";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ScrollDown } from "./scroll-down";
import TextType from "./text-type";

const Hero = async () => {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroContent />
    </Suspense>
  );
};

const HeroContent = async () => {
  const about = await prisma.about.findFirst();
  return (
    <section className="relative min-h-dvh snap-start snap-always scroll-mt-20 flex flex-col items-center w-full pt-16 sm:pt-20 pb-4 sm:pb-8 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] sm:left-[10%] h-96 w-96 rounded-full bg-blue-500/40 sm:bg-blue-500/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] sm:right-[15%] h-112 w-md rounded-full bg-purple-500/40 sm:bg-purple-500/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/40 sm:bg-cyan-500/30 blur-[100px]" />
      </div>
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 -z-10 bg-linear-to-t from-background to-transparent pointer-events-none" />

      <div className="flex flex-col items-center gap-3 sm:gap-4 my-auto relative z-10">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <Image
            src={about?.avatarUrl || ""}
            alt={about?.name || "Avatar"}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-semibold text-sm sm:text-base">
          Hi, I'm {about?.name} 👋
        </span>
        <TextType
          text={[(about?.title || "")]}
          className="text-xl sm:text-2xl font-bold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
          typingSpeed={75}
          pauseDuration={5000}
          showCursor
          cursorCharacter="|"
          deletingSpeed={50}
          variablespeedenabled="false"
          variablespeedmin={60}
          variablespeedmax={120}
          cursorblinkduration={0.5}
        />
        <p className="max-w-85 sm:max-w-140 text-center text-xs sm:text-base duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5">
          {about?.bio}
        </p>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-8 landscape:mt-3">
          <Button className="rounded-tl-none rounded-br-none shadow-md p-4" variant="outline" asChild>
            <a
              href={about?.resumeUrl || ""}
              download={`Resume_${about?.name || ""}`}
            >
              Download Resume
            </a>
          </Button>
          <Button className="rounded-tl-none rounded-br-none p-4" asChild>
            <a href="#contact">
              Connect With Me
            </a>
          </Button>
        </div>
      </div>
      <ScrollDown targetId="#projects" />
    </section>
  );
};

export default Hero;

// skeleton for hero while loading
const HeroSkeleton = () => {
  return (
    <section className="min-h-dvh snap-start snap-always scroll-mt-20 flex flex-col items-center w-full pt-16 sm:pt-20 pb-4 sm:pb-8">
      <div className="flex flex-col items-center gap-3 sm:gap-4 my-auto w-full">
        <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-500/40" />
        <Skeleton className="w-32 h-5 bg-gray-500/40" />
        <Skeleton className="w-56 sm:w-72 h-7 sm:h-8 bg-gray-500/40" />
        <div className="flex flex-col items-center gap-2 w-full max-w-140">
          <Skeleton className="w-full h-4 bg-gray-500/40" />
          <Skeleton className="w-3/4 h-4 bg-gray-500/40" />
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-8 landscape:mt-3">
          <Skeleton className="w-36 h-10 rounded-full bg-gray-500/40" />
          <Skeleton className="w-36 h-10 rounded-full bg-gray-500/40" />
        </div>
      </div>
      <div className="mt-auto pt-4 flex flex-col items-center gap-1">
        <Skeleton className="w-20 h-4 bg-gray-500/40" />
      </div>
    </section>
  );
};
