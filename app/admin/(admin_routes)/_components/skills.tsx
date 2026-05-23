import Link from "next/link";
import { Plus } from "lucide-react";

import { Skill } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import SkillCard from "./skill-card";

const Skills = ({ skills }: { skills: Skill[] }) => {
  return (
    <>
      <div className="flex justify-end">
        <Button asChild variant="outline" className="mb-4" title="Add Skill">
          <Link href="/admin/skills/add">
            <Plus className="mr-2" />
            Add Skill
          </Link>
        </Button>
      </div>
      <SkillCard skills={skills} />
    </>
  );
};

export default Skills;
