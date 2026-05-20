import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";

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

export const metadata: Metadata = {
  title: "M4.Dev",
  description:
    "A full-stack web developer proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and databases. Skilled in building scalable, responsive, and user-friendly web applications.",
  authors: [
    {
      name: "M4.Dev",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={cn("font-encode", encodeSansSemiExpanded.variable)}
    >
      <body className={encodeSansSemiExpanded.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
