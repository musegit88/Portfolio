import { skills } from "@/lib/constants";
import { IconType } from "react-icons/lib";

const Skills = () => {
  return (
    <section className="mt-24">
      <h5 className="text-xl font-medium">Skills</h5>
      <p>Experience in modern web development frameworks and tools.</p>
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;

interface SkillCardProps {
  skill: {
    title: string;
    icon: IconType;
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="border p-2 rounded-md transition duration-200 shadow-md"
      title={skill.title}
    >
      <skill.icon size={40} />
    </div>
  );
};
