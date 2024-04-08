import { skills } from "@/lib/constants";
import { IconType } from "react-icons/lib";

const Skills = () => {
  return (
    <section className="mt-24">
      <h5 className="text-xl font-medium">Skills</h5>
      <p>Experience in modern web development frameworks and tools.</p>
      <div className="flex flex-wrap  w-full gap-4 mt-6">
        {skills.map((icon, index) => (
          <SkillCard key={index} icon={icon} />
        ))}
      </div>
    </section>
  );
};

export default Skills;




interface SkillCardProps {
  icon: IconType;
}

const SkillCard = ({ icon: Icon }: SkillCardProps) => {
  return (
    <div className="border bg-slate-200 p-2 rounded hover:bg-black hover:text-white transition duration-200">
      <Icon size={40} className="" />
    </div>
  );
};