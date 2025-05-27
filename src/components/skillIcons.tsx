import { IconType } from "react-icons";
import { 
  SiTypescript , SiReact, SiHtml5, SiCss3, SiTailwindcss, SiMysql, SiSpring, SiSpringboot, SiFigma, SiAdobephotoshop, SiAdobeillustrator,SiIntellijidea, SiNaver, SiDocker, SiNotion 
} from "react-icons/si";
import { FaJava, FaJsSquare, FaGithub } from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
  font: string;
  category: "Front-end" | "Back-end" | "DevOps" | "Cooperation" | "tool";
}

export const skillIcons: SkillItem[] = [
  // Front-end
  { name: "JavaScript", icon: SiTypescript, color: "#3178C6", font: "#fff", category: "Front-end" },
  { name: "TypeScript", icon: FaJsSquare, color: "#F7DF1E", font: "#000", category: "Front-end" },
  { name: "React", icon: SiReact, color: "#61DAFB", font: "#fff", category: "Front-end" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", font: "#fff", category: "Front-end" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", font: "#fff", category: "Front-end" },
  { name: "Tailwindcss", icon: SiTailwindcss, color: "#3178C6", font: "#fff", category: "Front-end" },
  { name: "JSP", icon: FaJava, color: "#EDEDED", font: "#E34F26", category: "Front-end" },

  // Back-end
  { name: "JAVA", icon: FaJava, color: "#fff", font: "#1F527F", category: "Back-end" },
  { name: "MySQL", icon: SiMysql, color: "#00B4CE", font: "#fff", category: "Back-end" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", font: "#fff", category: "Back-end" },
  { name: "Spring MVC", icon: SiSpring, color: "#6DB33F", font: "#fff", category: "Back-end" },

  // DevOps
  { name: "NCloud", icon: SiNaver, color: "#0BC95F", font: "#fff", category: "DevOps" },
  { name: "Docker", icon: SiDocker , color: "#3178C6", font: "#fff", category: "DevOps" },

  // Cooperation
  { name: "GitHub", icon: FaGithub , color: "#000", font: "#fff", category: "Cooperation" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", font: "#fff", category: "Cooperation" },
  { name: "Notion", icon: SiNotion, color: "#fff", font: "#000", category: "Cooperation" },

  // Tool
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF", font: "#fff", category: "tool" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00", font: "#fff", category: "tool" },
  { name: "IntelliJ", icon: SiIntellijidea , color: "#000", font: "#fff", category: "tool" },
  { name: "VSCode", icon: TbBrandVscode , color: "#fff", font: "#3A5D82", category: "tool" },
];
