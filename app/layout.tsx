import type { Metadata } from "next";
import { Encode_Sans_Semi_Expanded } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const font = Encode_Sans_Semi_Expanded({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "800"],
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
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
