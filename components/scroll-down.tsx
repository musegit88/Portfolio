"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export const ScrollDown = ({ targetId = "#projects" }: { targetId?: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <a
      ref={ref}
      href={targetId}
      aria-label="Scroll to next section"
      className={`mt-auto pt-4 flex flex-col items-center gap-1 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="text-xs sm:text-sm text-muted-foreground">Scroll Down</span>
      <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
    </a>
  );
};
