"use client";

import Image from "next/image";
import Link from "next/link";
import { Archive, Pencil } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteProject from "./delete-project";
import ToggleStar from "./toggle-star";

const ProjectCard = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="p-0 overflow-hidden shadow-sm border border-transparent hover:shadow-md dark:hover:border dark:hover:border-border transition-all duration-300 ease-in-out"
        >
          <CardContent className="flex flex-col sm:flex-row p-0">
            <div className="flex-1 h-[240px] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={500}
                height={500}
                className="w-full h-full object-cover object-left-top"
              />
            </div>
            <div className="flex-1 w-full sm:w-1/2 h-full p-2 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <ToggleStar project={project} />
                <Button asChild variant="edit" size="icon" title="Edit project">
                  <Link href={`/admin/dashboard/projects/edit/${project.id}`}>
                    <Pencil />
                  </Link>
                </Button>
                <Button variant="archive" size="icon" title="Archive project">
                  <Archive />
                </Button>
                <DeleteProject
                  projectId={project.id}
                  projectTitle={project.title}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectCard;
