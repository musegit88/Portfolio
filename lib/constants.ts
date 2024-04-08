import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";

export const skills = [
  FaHtml5,
  FaCss3Alt,
  IoLogoJavascript,
  FaReact,
  BiLogoTailwindCss,
  SiNextdotjs,
  BiLogoMongodb,
  DiMysql,
  FaGitAlt,
  FaGithub,
];
export const projects = [
  {
    id: 1,
    image: "/images/primeai.png",
    label: "Prime AI",
    description: "All in one AI app.",
    href: "https://primeai.vercel.app",
    tech: ["NextJs", "Sql"],
  },

  {
    id: 2,
    image: "/images/ticketpass.png",
    label: "Ticketpass",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    href: "https://ticketpass-tau.vercel.app",
    tech: ["NextJs", "mongodb", "prisma"],
  },
];

export const contacts = [
  {
    mail: "m4dev88@outlook.com",
    icon: BiLogoGmail,
    isMail: true,
  },
  {
    href: "https://www.linkedin.com/in/muse-habib-87ba772a9",
    icon: FaLinkedinIn,
    isMail: false,
  },
];
