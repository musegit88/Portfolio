import Link from "next/link";
import Image from "next/image";
import { Archive, Pencil, Plus, Trash } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
