"use client";

const Footer = () => {
  const year = new Date().getFullYear();
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="flex flex-col gap-2 md:flex-row items-center justify-between my-8">
      <span className="text-xs whitespace-nowrap">
        Copyright © {year} M4 Dev
      </span>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://storyset.com/data"
          target="_blank"
          className="text-muted-foreground text-xs sm:text-sm dark:text-white"
        >
          Data illustrations by Storyset
        </a>
        <span
          onClick={handleClick}
          className="cursor-pointer text-xs sm:text-sm"
        >
          Back to top
        </span>
      </div>
    </section>
  );
};

export default Footer;
