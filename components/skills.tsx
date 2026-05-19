import { getIcon } from "@/lib/icon-mapper";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

const Skills = async () => {
  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <SkillsContent />
    </Suspense>
  );
};

const SkillsContent = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const skills = await prisma.skill.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return (
    <section className="mt-24">
      <h5 className="text-xl font-medium">Skills</h5>
      <p className="text-xs sm:text-sm">
        Experience in modern web development frameworks and tools.
      </p>
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;

interface SkillCardProps {
  skill: {
    name: string;
    icon: string | null;
    category: string;
    level: number | null;
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const Icon = getIcon(skill.icon);

  return (
    <div
      className="group flex flex-col items-center gap-2 min-w-[80px] border p-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:border-primary/50"
      title={skill.name}
    >
      {Icon && (
        <Icon
          size={32}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <span className="text-xs">{skill.name}</span>
    </div>
  );
};

const SkillsSkeleton = async () => {
  const skills = await prisma.skill.count();
  return (
    <section className="mt-24">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-40 h-6 bg-gray-500/40" />
        <Skeleton className="w-32 h-4 bg-gray-500/40" />
      </div>
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {Array.from({ length: skills }).map((_, index) => (
          <Skeleton key={index} className="w-20 h-20 bg-gray-500/40" />
        ))}
      </div>
    </section>
  );
};
