import Link from "next/link";
import Image from "next/image";
import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Archive, Pencil, Plus, Trash } from "lucide-react";

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <div>
      <div className="flex justify-end">
        <Button asChild variant="outline" className="mb-4" title="Add Project">
          <Link href="/admin/dashboard/projects/add">
            <Plus className="mr-2" />
            Add Project
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-0 overflow-hidden">
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
                  <Button
                    variant="edit"
                    size="icon"
                    title="Edit project"
                    className=""
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="archive"
                    size="icon"
                    title="Archive project"
                    className=""
                  >
                    <Archive />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    title="Delete project"
                    className=""
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
