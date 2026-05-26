import Link from "next/link";
import { Plus } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import ProjectCard from "./project-card";

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-end">
        <Button asChild variant="outline" className="mb-4" title="Add Project">
          <Link href="/admin/projects/add">
            <Plus className="mr-2" />
            Add Project
          </Link>
        </Button>
      </div>
      <ProjectCard projects={projects} />
    </div>
  );
};

export default Projects;
