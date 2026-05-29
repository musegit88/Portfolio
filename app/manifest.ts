import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portfolio",
    short_name: "Portfolio",
    description: "Portfolio of a web developer",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: [
      "technology",
      "portfolio",
      "web development",
      "ui",
      "ux",
      "frontend",
      "backend",
      "fullstack",
      "developer",
      "software engineer",
      "computer science",
      "engineering",
    ],
    screenshots: [
      {
        src: "/screenshots/01.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/screenshots/02.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
