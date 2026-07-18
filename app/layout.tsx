import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { prisma } from "@/lib/prisma";

const encodeSansSemiExpanded = localFont({
  src: [
    {
      path: "../public/fonts/EncodeSansSemiExpanded-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/EncodeSansSemiExpanded-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-encode",
});

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;

  try {
    settings = await prisma.setting.findFirst();
  } catch (error) {
    // Log error but don't fail the build (e.g. during Vercel static compilation)
    console.warn(
      "Failed to fetch settings from DB in generateMetadata:",
      error,
    );
  }
  return {
    title: settings?.siteTitle || "Dev Portfolio | Full Stack Web Developer",
    description:
      settings?.siteDescription ||
      "A full-stack web developer proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and databases. Skilled in building scalable, responsive, and user-friendly web applications.",
    authors: [
      {
        name: "M4.Dev",
      },
    ],
    keywords: [
      "M4.Dev",
      "web developer",
      "full-stack",
      "full-stack developer",
      "Front-end developer",
      "Back-end developer",
      "MERN stack",
      "PERN stack",
      "React",
      "Node.js",
      "Express.js",
      "JavaScript",
      "HTML",
      "CSS",
      "database",
      "scalable",
      "responsive",
      "user-friendly",
      "web applications",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "Next.js",
      "Shadcn UI",
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={encodeSansSemiExpanded.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster richColors position="top-right" duration={3000} />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
