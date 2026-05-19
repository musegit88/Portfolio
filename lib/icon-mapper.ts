import { IconType } from "react-icons";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoTypescript, BiLogoTailwindCss } from "react-icons/bi";
import { SiNextdotjs, SiExpress, SiPostgresql, SiPostman } from "react-icons/si";
import { DiMysql } from "react-icons/di";

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
};

export const getIcon = (iconName: string | null): IconType | null => {
  if (!iconName) return null;
  return iconMap[iconName] || null;
};
