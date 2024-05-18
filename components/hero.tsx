import Image from "next/image";

const Hero = () => {
  return (
    <section className="mt-20 flex flex-col items-center md:flex-row  w-full">
      <div className="flex flex-col gap-8 max-w-2xl">
        <h2 className="max-sm:text-3xl text-4xl font-semibold">
          Hi,I&apos;M Muse a full-stack <br /> web developer{" "}
        </h2>
        <p className="tracking-tighter max-[932px]:max-w-[480px] text-lg duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5">
          {" "}
          A creative and detail-oriented web developer with a passion for
          building beautiful and functional websites. Beyond coding, I enjoy
          exploring new technologies, playing video games, and embracing the
          thrill of learning something new every day.
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
