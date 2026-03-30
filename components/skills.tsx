import { skills } from "@/lib/constants";
import { IconType } from "react-icons/lib";

const Skills = () => {
  return (
    <section className="mt-24">
      <h5 className="text-xl font-medium">Skills</h5>
      <p className="text-xs sm:text-sm">
        Experience in modern web development frameworks and tools.
      </p>
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
    name: string;
    icon: IconType;
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div
      className="group flex flex-col items-center gap-2 min-w-[80px] border p-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:border-primary/50"
      title={skill.name}
    >
      <skill.icon
        size={32}
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-xs">{skill.name}</span>
    </div>
  );
};
