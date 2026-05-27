import { Suspense } from "react";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import { Skeleton } from "./ui/skeleton";

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
    <section className="mt-20 flex flex-col items-center md:flex-row w-full">
      <div className="flex flex-col gap-8 max-w-2xl">
        <h2 className="max-[380px]:text-xl max-sm:text-3xl text-4xl font-semibold">
          Hi, I&apos;m {about?.name} 👋 <br /> {about?.title}
        </h2>
        <p className="tracking-tighter max-[932px]:max-w-[480px] text-sm sm:text-lg duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5">
          {about?.bio}
        </p>
      </div>
      <div className="relative w-[280px] h-[280px]">
        <Image
          src="/Development-pana.svg"
          alt="web developer"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;

// skeleton for hero while loading
const HeroSkeleton = () => {
  return (
    <section className="mt-20 flex flex-col items-center md:flex-row w-full gap-4 max-w-6xl">
      <div className="flex flex-col gap-2 max-w-2xl">
        <Skeleton className="w-[300px] sm:w-[672px] h-20 bg-gray-500/40" />
        <Skeleton className="w-[250px] sm:w-[576px] h-4 bg-gray-500/40" />
        <Skeleton className="w-[250px] sm:w-[566px] h-4 bg-gray-500/40" />
        <Skeleton className="w-[250px] sm:w-[540px] h-4 bg-gray-500/40" />
      </div>
      <div className="w-[280px] h-[280px]">
        <Skeleton className="w-full h-full bg-gray-500/40" />
      </div>
    </section>
  );
};
