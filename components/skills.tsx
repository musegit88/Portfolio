import { Suspense } from "react";
import Link from "next/link";
import { Session } from "next-auth";

import { getIcon } from "@/lib/icon-mapper";
import { prisma } from "@/lib/prisma";

import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

import { AntigravityDots } from "./antigravity-dots";

const Skills = async ({ user }: { user?: Session["user"] }) => {
  return (
    <Suspense fallback={<SkillsSkeleton />}>
      <SkillsContent user={user} />
    </Suspense>
  );
};

const SkillsContent = async ({ user }: { user?: Session["user"] }) => {
  const skills = await prisma.skill.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return (
    <section id="skills" className="relative py-16 sm:py-24 snap-start snap-always scroll-mt-20 pt-20 flex flex-col items-center justify-start overflow-hidden">
      {/* Interactive Dot Matrix Background */}
      <AntigravityDots />
      {/* Top & bottom fade to blend with adjacent sections */}
      <div className="absolute top-0 inset-x-0 h-32 -z-10 bg-linear-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 -z-10 bg-linear-to-t from-background to-transparent pointer-events-none" />

      <h5 className="text-xl sm:text-2xl font-medium relative z-10">Skills</h5>
      <p className="text-center text-xs sm:text-sm text-muted-foreground relative z-10">
        Experience in modern web development frameworks and tools.
      </p>
      <div className="container flex justify-center sm:justify-start flex-wrap w-full gap-4 mt-6 relative z-10">
        {skills.length > 0 ? (
          skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
        ) : (
          <div className="text-sm text-center w-full">
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <p>Manage Skills from </p>
                <Button asChild>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <p>🤭 Oops! Nothing to show.</p>
            )}
          </div>
        )}
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
      className="group flex flex-col items-center gap-2 min-w-20 border bg-background p-4 sm:p-8 rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:border-primary/50"
      title={skill.name}
    >
      {Icon && (
        <Icon
          className="w-12 h-12 sm:w-24 sm:h-24 transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <span className="text-xs sm:text-sm">{skill.name}</span>
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
          <Skeleton key={index} className="w-12 h-12 sm:w-24 sm:h-24 bg-gray-500/40" />
        ))}
      </div>
    </section>
  );
};
