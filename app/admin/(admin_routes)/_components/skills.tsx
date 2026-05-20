import Link from "next/link";
import { Skill } from "@/generated/prisma/client";
import { getIcon } from "@/lib/icon-mapper";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";

const Skills = ({ skills }: { skills: Skill[] }) => {
  return (
    <>
      <div className="flex justify-end">
        <Button asChild variant="outline" className="mb-4" title="Add Skill">
          <Link href="/admin/dashboard/skills/add">
            <Plus className="mr-2" />
            Add Skill
          </Link>
        </Button>
      </div>
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {skills.map((skill) => {
          const Icon = getIcon(skill.icon);
          return (
            <div key={skill.id} className="group relative">
              <div className="absolute top-0 -right-2 hidden group-hover:flex flex-col justify-between gap-2">
                <Button
                  size="icon-sm"
                  title="Edit skill"
                  className="rounded-full bg-green-600 hover:bg-green-600/80 text-green-600-foreground"
                >
                  <Pencil />
                </Button>
                <Button
                  size="icon-sm"
                  title="Delete skill"
                  className="rounded-full bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                >
                  <Trash />
                </Button>
              </div>
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Skills;
