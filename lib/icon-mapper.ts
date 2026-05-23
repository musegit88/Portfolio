import { IconType } from "react-icons";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import {
  BiLogoTypescript,
  BiLogoTailwindCss,
  BiLogoSpringBoot,
} from "react-icons/bi";
import {
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiPostman,
  SiGraphql,
  SiReactquery,
  SiFirebase,
  SiVite,
  SiSvelte,
  SiCplusplus,
  SiKotlin,
  SiRubyonrails,
  SiMongodb,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import {
  FaAngular,
  FaAws,
  FaDigitalOcean,
  FaJava,
  FaPython,
  FaRust,
  FaStripe,
  FaVuejs,
} from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";
import { RiSupabaseFill } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";

export const iconMap: Record<string, IconType> = {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDocker,
  IoLogoJavascript,
  BiLogoTypescript,
  BiLogoTailwindCss,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiPostman,
  DiMysql,
  FaPython,
  SiGraphql,
  FaJava,
  SiReactquery,
  TbBrandReactNative,
  SiFirebase,
  RiSupabaseFill,
  FaAws,
  IoLogoVercel,
  FaDigitalOcean,
  FaStripe,
  FaAngular,
  SiVite,
  FaVuejs,
  SiSvelte,
  SiCplusplus,
  BiLogoSpringBoot,
  SiKotlin,
  FaRust,
  SiRubyonrails,
  SiMongodb,
};

export const getIcon = (iconName: string | null): IconType | null => {
  if (!iconName) return null;
  return iconMap[iconName] || null;
};
