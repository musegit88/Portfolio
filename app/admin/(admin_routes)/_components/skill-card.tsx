"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { getIcon } from "@/lib/icon-mapper";
import { Skill } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import DeleteSkill from "./delete-skill";

const SkillCard = ({ skills }: { skills: Skill[] }) => {
  return (
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
                <Link href={`/admin/skills/edit/${skill.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <DeleteSkill skillId={skill.id} skillName={skill.name} />
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
  );
};

export default SkillCard;
