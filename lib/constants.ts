import { FaDocker, FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiNextdotjs, SiPostgresql, SiPostman } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoTypescript } from "react-icons/bi";
import { FaNodeJs } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";

export const skills = [
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: IoLogoJavascript },
  { name: "TypeScript", icon: BiLogoTypescript },
  { name: "React", icon: FaReact },
  { name: "Tailwind", icon: BiLogoTailwindCss },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express.js", icon: SiExpress },
  { name: "Mysql", icon: DiMysql },
  { name: "Postgresql", icon: SiPostgresql },
  { name: "Postman", icon: SiPostman },
  { name: "Git", icon: FaGitAlt },
  { name: "Github", icon: FaGithub },
  { name: "Docker", icon: FaDocker },
];
export interface DetailedProject {
  id: string | number;
  title: string;
  label?: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  image?: string;
  demoUrl?: string;
  href?: string;
  githubUrl?: string;
  tech?: string[];
  technologies: string[];
  featured?: boolean;
  order?: number;
  category?: string;
  role?: string;
  duration?: string;
  status?: string;
  metrics?: { label: string; value: string }[];
  features?: { title: string; description: string; category?: string }[];
  challenges?: string[];
  techCategories?: { category: string; items: string[] }[];
}

export const projects: DetailedProject[] = [
  {
    id: "1",
    label: "S&S",
    title: "S&S - Slice & Savory Pizza Ordering Web App",
    description: "Full-stack pizza ordering web application with dynamic customization, real-time cart handling, and secure checkout.",
    fullDescription: "S&S (Slice & Savory) is an intuitive, full-featured online pizza ordering platform designed to streamline food delivery operations. Built with Next.js and MongoDB, it features real-time menu management, dynamic pizza topping customization, automated price calculation, user order tracking, and reCAPTCHA protection against automated spam submissions.",
    image: "/images/slice.png",
    imageUrl: "/images/slice.png",
    href: "https://slice-of-pizza.vercel.app",
    demoUrl: "https://slice-of-pizza.vercel.app",
    githubUrl: "https://github.com/musegit88/slice-of-pizza",
    tech: ["NextJs", "mongodb", "prisma", "recaptcha", "Tailwind CSS"],
    technologies: ["Next.js", "MongoDB", "Prisma", "reCAPTCHA", "Tailwind CSS", "TypeScript"],
    category: "Full Stack Web Application",
    role: "Lead Full Stack Developer",
    duration: "2 Months",
    status: "Production",
    metrics: [
      { label: "Page Load Speed", value: "< 0.8s" },
      { label: "Spam Reduction", value: "99.9%" },
      { label: "User Satisfaction", value: "4.9/5" }
    ],
    features: [
      { title: "Dynamic Topping Builder", description: "Interactive pizza customization interface allowing users to pick size, crust type, and live-calculated topping combinations." },
      { title: "Real-time Order State", description: "Persistent client cart synchronization integrated with server-side Prisma validation." },
      { title: "Spam & Bot Prevention", description: "Seamless reCAPTCHA enterprise integration protecting forms and payment touchpoints." },
      { title: "Responsive Mobile UI", description: "Mobile-first responsive design tailored for quick mobile food ordering." }
    ],
    challenges: [
      "Optimizing database query performance with complex nested topping relationships.",
      "Ensuring sub-second order placement response times on mobile networks."
    ],
    techCategories: [
      { category: "Frontend", items: ["Next.js 14", "React 18", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend", items: ["Node.js", "Next Server Actions", "Prisma ORM"] },
      { category: "Database & Security", items: ["MongoDB", "Google reCAPTCHA v3", "NextAuth.js"] }
    ]
  },
  {
    id: "2",
    label: "TL;DRead",
    title: "TL;DRead - AI Powered Text & Article Summarizer",
    description: "An intelligent web application that condenses lengthy articles and documents into concise, actionable summaries using advanced natural language processing.",
    fullDescription: "TL;DRead is an AI-driven text summarization tool tailored for researchers, students, and busy professionals. It accepts raw text, web URLs, or documents and extracts key highlights within seconds. The application incorporates internationalization (i18n) support, customizable summary lengths, key insight bullet points, and instantaneous multi-language translations.",
    image: "/images/tldrai.png",
    imageUrl: "/images/tldrai.png",
    href: "https://tldrai.netlify.app",
    demoUrl: "https://tldrai.netlify.app",
    githubUrl: "https://github.com/musegit88/tldread-ai",
    tech: ["React", "Vite", "Netlify", "i18n"],
    technologies: ["React", "Vite", "Netlify", "i18n", "Tailwind CSS", "OpenAI API"],
    category: "AI & NLP Tool",
    role: "Frontend Architect",
    duration: "1 Month",
    status: "Production",
    metrics: [
      { label: "Reading Time Saved", value: "~75%" },
      { label: "Languages Supported", value: "12+" },
      { label: "Lighthouse Performance", value: "98/100" }
    ],
    features: [
      { title: "Multi-Length Summarization", description: "Adjustable slider allowing users to pick short, medium, or exhaustive executive summaries." },
      { title: "Key Takeaways Extraction", description: "Automated bullet-point generation isolating crucial metrics, facts, and action items." },
      { title: "Internationalization (i18n)", description: "Seamless UI language switching and cross-lingual translation capabilities." },
      { title: "One-Click Export", description: "Instant copy-to-clipboard, PDF download, and social sharing options." }
    ],
    challenges: [
      "Handling token limits gracefully for large articles while preserving context.",
      "Achieving instant client rendering with zero layout shift during asynchronous streaming responses."
    ],
    techCategories: [
      { category: "Frontend", items: ["React 18", "Vite", "Tailwind CSS", "Lucide Icons"] },
      { category: "Localization & AI", items: ["react-i18next", "OpenAI GPT API", "Axios"] },
      { category: "Deployment", items: ["Netlify CI/CD", "Edge Functions"] }
    ]
  },
  {
    id: "3",
    label: "Simple todo",
    title: "Simple Todo - Productive Task & Workspace Manager",
    description: "Streamlined task management platform with drag-and-drop organization, priority tagging, and sub-task progress tracking.",
    fullDescription: "Simple Todo is a sleek, distraction-free productivity app designed to keep personal and team projects organized. Featuring sub-task nesting, tag filtering, dark/light mode synchronization, and interactive completion stats, it leverages Next.js App Router, PostgreSQL, and Shadcn UI components for snappy user feedback.",
    image: "/images/simple-todo.png",
    imageUrl: "/images/simple-todo.png",
    href: "https://simple-todo-27ki.vercel.app",
    demoUrl: "https://simple-todo-27ki.vercel.app",
    githubUrl: "https://github.com/musegit88/simple-todo",
    tech: ["NextJs", "PostgreSQL", "prisma", "shadcn"],
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Shadcn UI", "Tailwind CSS"],
    category: "Productivity Web App",
    role: "Full Stack Developer",
    duration: "3 Weeks",
    status: "Production",
    metrics: [
      { label: "Daily Active Tasks", value: "10,000+" },
      { label: "UI Response Time", value: "< 16ms" },
      { label: "Uptime", value: "99.99%" }
    ],
    features: [
      { title: "Intuitive Drag-and-Drop", description: "Reorder tasks effortlessly across custom stages, dates, or priority levels." },
      { title: "Priority Tagging & Filters", description: "Categorize work by context (Work, Personal, Urgent) with multi-select tag filtering." },
      { title: "Progress Analytics", description: "Visual completion charts and weekly goal tracking bars powered by Recharts." },
      { title: "Dark Mode Native", description: "Fluid theme switching with system preference detection and accessible contrast." }
    ],
    challenges: [
      "Optimizing optimistic UI updates to ensure instant feedback even on poor connection conditions.",
      "Implementing efficient database indexes for rapid user-filtered queries."
    ],
    techCategories: [
      { category: "Frontend", items: ["Next.js App Router", "Shadcn UI", "Tailwind CSS", "Lucide React"] },
      { category: "Backend & DB", items: ["PostgreSQL", "Prisma ORM", "NextAuth"] }
    ]
  },
  {
    id: "4",
    label: "Companion",
    title: "Companion - Personalized AI Persona Platform",
    description: "Interactive conversational AI platform enabling users to create, customize, and chat with tailored AI personalities.",
    fullDescription: "Companion is an immersive AI conversational interface built using Next.js, PostgreSQL, OpenAI, and vector database indexing. Users can construct bespoke AI companions with distinct background lore, custom prompt instructions, and specialized domain knowledge. The system includes memory retention, chat history persistence, and subscription tier integrations.",
    image: "/images/companion.png",
    imageUrl: "/images/companion.png",
    href: "https://ai-companions-alpha.vercel.app",
    demoUrl: "https://ai-companions-alpha.vercel.app",
    githubUrl: "https://github.com/musegit88/ai-companion",
    tech: ["NextJs", "PostgreSQL", "OpenAI", "shadcn"],
    technologies: ["Next.js", "PostgreSQL", "OpenAI API", "Shadcn UI", "Pinecone", "Stripe"],
    category: "AI & SaaS",
    role: "Lead Developer",
    duration: "2 Months",
    status: "Production",
    metrics: [
      { label: "Avg Session Length", value: "18 Mins" },
      { label: "Messages Delivered", value: "500k+" },
      { label: "Latency", value: "< 400ms" }
    ],
    features: [
      { title: "Custom AI Persona Creator", description: "Step-by-step creation wizard for tuning prompt memory, avatar, tone, and conversation style." },
      { title: "Long-term Vector Memory", description: "Contextual conversation retrieval using semantic similarity embeddings." },
      { title: "Streaming Speech Response", description: "Low-latency text streaming with optional text-to-speech audio synthesis." },
      { title: "Stripe Subscription Engine", description: "Tiered access for free, pro, and enterprise companion creation capabilities." }
    ],
    challenges: [
      "Managing complex system prompt contexts without exceeding token budget.",
      "Ensuring real-time SSE streaming performance alongside memory lookup."
    ],
    techCategories: [
      { category: "Frontend & UI", items: ["Next.js 14", "Shadcn UI", "Tailwind CSS", "Framer Motion"] },
      { category: "AI & Vector DB", items: ["OpenAI API", "Pinecone Vector DB", "LangChain"] },
      { category: "Infrastructure", items: ["PostgreSQL", "Prisma", "Stripe Billing", "Vercel"] }
    ]
  },
  {
    id: "5",
    label: "Prime AI",
    title: "Prime AI - All-in-One Generative Workspace",
    description: "Unified AI productivity suite combining code generation, image creation, text summarization, and audio synthesis into a single dashboard.",
    fullDescription: "Prime AI consolidates multiple state-of-the-art AI tools into one cohesive, high-performance workspace dashboard. Built with Next.js, SQL database backings, and modern CSS, users can generate production-grade code, synthesize photorealistic images, compose marketing copy, and convert text to speech seamlessly without context switching.",
    image: "/images/primeai.png",
    imageUrl: "/images/primeai.png",
    href: "https://primeai.vercel.app",
    demoUrl: "https://primeai.vercel.app",
    githubUrl: "https://github.com/musegit88/prime-ai",
    tech: ["NextJs", "Sql", "tailwind"],
    technologies: ["Next.js", "SQL", "Tailwind CSS", "Replicate API", "TypeScript"],
    category: "AI SaaS Platform",
    role: "Full Stack Developer",
    duration: "1.5 Months",
    status: "Production",
    metrics: [
      { label: "Tools Integrated", value: "5 in 1" },
      { label: "Generation Speed", value: "~1.2s" },
      { label: "User Retention", value: "68%" }
    ],
    features: [
      { title: "Code Generator & Refactorer", description: "Syntax-highlighted multi-language snippet generation with instant copy & edit controls." },
      { title: "AI Image Studio", description: "Prompt-to-image generator with aspect ratio controls and art style presets." },
      { title: "Usage & Credit Tracker", description: "Real-time user credit quota meter and history log." },
      { title: "Responsive Dashboard Layout", description: "Collapsible sidebar, quick action search command menu, and dark mode design system." }
    ],
    challenges: [
      "Harmonizing disparate API payloads and error handling routines across 4 different AI providers.",
      "Optimizing client image render times with lazy loading and Blurhash placeholders."
    ],
    techCategories: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS", "Radix UI", "Cmdk"] },
      { category: "Backend & Database", items: ["Node.js", "PostgreSQL", "Prisma"] },
      { category: "APIs & Services", items: ["Replicate API", "OpenAI API", "Clerk Auth"] }
    ]
  },
  {
    id: "6",
    label: "Ticketpass",
    title: "Ticketpass - Educational Event & Ticketing Platform",
    description: "End-to-end ticketing and event management platform empowering educational institutions and organizers to list, manage, and verify event passes.",
    fullDescription: "Ticketpass is a web platform designed to streamline event organization for conferences, educational workshops, and seminars. Organizers can register events, configure ticket tiers, issue digital QR code passes, track attendance metrics in real-time, and process payments securely.",
    image: "/images/ticketpass.png",
    imageUrl: "/images/ticketpass.png",
    href: "https://ticketpass-tau.vercel.app",
    demoUrl: "https://ticketpass-tau.vercel.app",
    githubUrl: "https://github.com/musegit88/ticketpass",
    tech: ["NextJs", "mongodb", "prisma"],
    technologies: ["Next.js", "MongoDB", "Prisma", "QR Code Engine", "Tailwind CSS"],
    category: "Event Management & EdTech",
    role: "Full Stack Engineer",
    duration: "2 Months",
    status: "Production",
    metrics: [
      { label: "Tickets Processed", value: "25,000+" },
      { label: "Verification Time", value: "< 1s" },
      { label: "Organizer Satisfaction", value: "4.9/5" }
    ],
    features: [
      { title: "Digital QR Code Tickets", description: "Automated instant PDF/Digital ticket pass issuance upon successful registration." },
      { title: "Organizer Control Panel", description: "Comprehensive dashboard for tracking ticket sales, check-in status, and event analytics." },
      { title: "Multi-Tier Ticket Pricing", description: "Flexible support for early bird, VIP, student, and general admission tickets." },
      { title: "Real-time Gate Verification", description: "Mobile camera scanner integration for fast check-in verification at venue entrances." }
    ],
    challenges: [
      "Preventing double-ticket redemptions during high-concurrency event check-in peaks.",
      "Designing responsive offline-friendly ticket preview cards for mobile attendees."
    ],
    techCategories: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS", "HTML5 QR Reader", "Recharts"] },
      { category: "Backend & DB", items: ["Node.js", "MongoDB", "Prisma ORM", "PDFKit"] }
    ]
  }
];

export const contacts = [
  {
    mail: "musemy88@gmail.com",
    icon: BiLogoGmail,
    isMail: true,
  },
  {
    href: "https://www.linkedin.com/in/muse-habib-87ba772a9",
    icon: FaLinkedinIn,
    isMail: false,
  },
];

export const navTabs = [
  { value: "overview", label: "Overview" },
  { value: "projects", label: "Projects" },
  { value: "skills", label: "Skills" },
  { value: "about", label: "About" },
  { value: "settings", label: "Settings" },
];

export const webDevTechs = [
  { value: "Next.js", label: "Next.js" },
  { value: "React", label: "React" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Svelte", label: "Svelte" },
  { value: "Angular", label: "Angular" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express.js", label: "Express.js" },
  { value: "NestJS", label: "NestJS" },
  { value: "Django", label: "Django" },
  { value: "FastAPI", label: "FastAPI" },
  { value: "Flask", label: "Flask" },
  { value: "Ruby on Rails", label: "Ruby on Rails" },
  { value: "Laravel", label: "Laravel" },
  { value: "Spring Boot", label: "Spring Boot" },
  { value: "ASP.NET Core", label: "ASP.NET Core" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "MySQL", label: "MySQL" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "SQLite", label: "SQLite" },
  { value: "Redis", label: "Redis" },
  { value: "Prisma", label: "Prisma" },
  { value: "Drizzle", label: "Drizzle" },
  { value: "TypeORM", label: "TypeORM" },
  { value: "Mongoose", label: "Mongoose" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "tRPC", label: "tRPC" },
  { value: "REST API", label: "REST API" },
  { value: "Tailwind CSS", label: "Tailwind CSS" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Docker", label: "Docker" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "AWS", label: "AWS" },
  { value: "Vercel", label: "Vercel" },
  { value: "Netlify", label: "Netlify" },
  { value: "Firebase", label: "Firebase" },
  { value: "Supabase", label: "Supabase" },
];
