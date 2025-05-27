// components/SkillIconCard.tsx
import { IconType } from "react-icons";

interface SkillIconCardProps {
  name: string;
  icon: IconType;
  bgColor: string;
  fontColor: string;
}

export const SkillIconCard = ({
  name,
  icon: Icon,
  bgColor,
  fontColor,
}: SkillIconCardProps) => {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md text-sm font-semibold"
      style={{ backgroundColor: bgColor, color: fontColor, minWidth: "140px" }}
    >
      <Icon size={20} />
      <span>{name}</span>
    </div>
  );
};
