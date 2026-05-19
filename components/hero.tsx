"use client";
import { About } from "@/generated/prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [about, setAbout] = useState<About | null>(null);
  useEffect(() => {
    const fetchAbout = async () => {
      const response = await fetch("/api/about");
      const data = await response.json();
      setAbout(data);
    };
    fetchAbout();
  }, []);
  return (
    <section className="mt-20 flex flex-col items-center md:flex-row  w-full">
      <div className="flex flex-col gap-8 max-w-2xl">
        <h2 className="max-sm:text-3xl text-4xl font-semibold">
          Hi, I&apos;m {about?.name} a {about?.title} <br />{" "}
        </h2>
        <p className="tracking-tighter max-[932px]:max-w-[480px] text-lg duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5">
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
