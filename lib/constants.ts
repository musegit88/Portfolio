import { FaDocker, FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiNextdotjs, SiPostgresql } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoTypescript } from "react-icons/bi";

export const skills = [
  { title: "HTML5", icon: FaHtml5 },
  { title: "CSS", icon: FaCss3Alt },
  { title: "JavaScript", icon: IoLogoJavascript },
  { title: "TypeScript", icon: BiLogoTypescript },
  { title: "React", icon: FaReact },
  { title: "Tailwind", icon: BiLogoTailwindCss },
  { title: "NextJs", icon: SiNextdotjs },
  { title: "Mongodb", icon: BiLogoMongodb },
  { title: "Mysql", icon: DiMysql },
  { title: "Postgresql", icon: SiPostgresql },
  { title: "Git", icon: FaGitAlt },
  { title: "Github", icon: FaGithub },
  { title: "Docker", icon: FaDocker },
];
export const projects = [
  {
    id: 1,
    image: "/images/simple-todo.png",
    label: "Simple todo",
    description: "Manage tasks, create lists, and stay productive.",
    href: "https://simple-todo-27ki.vercel.app",
    tech: ["NextJs", "PostgreSQL", "prisma", "shadcn"],
  },
  {
    id: 2,
    image: "/images/companion.png",
    label: "Companion",
    description: "Your personal AI companion.",
    href: "https://ai-companions-alpha.vercel.app",
    tech: ["NextJs", "PostgreSQL", "OpenAI", "shadcn"],
  },
  {
    id: 3,
    image: "/images/primeai.png",
    label: "Prime AI",
    description: "All in one AI app.",
    href: "https://primeai.vercel.app",
    tech: ["NextJs", "Sql", "tailwind"],
  },
  {
    id: 4,
    image: "/images/ticketpass.png",
    label: "Ticketpass",
    description:
      "Ticketpass allows users to create, manage, and sell tickets for educational events.",
    href: "https://ticketpass-tau.vercel.app",
    tech: ["NextJs", "mongodb", "prisma"],
  },
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
