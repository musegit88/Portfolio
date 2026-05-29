"use client";

import type { ComponentProps } from "react";

import { useSortable, isSortableOperation } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";

import Image from "next/image";
import Link from "next/link";
import { GripVertical, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { Project } from "@/generated/prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteProject from "./delete-project";
import ToggleStar from "./toggle-star";
import ToggleArchive from "./toggle-archive";

import { toast } from "sonner";

const ProjectCard = ({ projects }: { projects: Project[] }) => {
  const router = useRouter();

  type OnDragEnd = NonNullable<
    ComponentProps<typeof DragDropProvider>["onDragEnd"]
  >;

  const handleDragEnd: OnDragEnd = async (event) => {
    // Ignore cancelled drags (e.g. user pressed Escape)
    if (event.canceled) return;

    const { operation } = event;

    // isSortableOperation narrows the type and gives us .initialIndex / .index
    if (!isSortableOperation(operation)) return;

    const { source } = operation;
    if (!source) return;

    const fromIndex = source.initialIndex; // where the item started
    const toIndex = source.index; // where it landed (after optimistic sort)

    // No actual movement
    if (fromIndex === toIndex) return;

    // Rebuild the order using the original server array
    const reordered = [...projects];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    const payload = reordered.map((p, index) => ({ id: p.id, order: index }));
    try {
      toast.promise(
        async () => {
          const response = await fetch("/api/projects/reorder", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projects: payload }),
          });
          if (!response.ok) {
            throw new Error("Failed to save new order. Please try again.");
          }
          return response.json();
        },
        {
          loading: "Saving new order...",
          success: (response: { message: string }) => response.message,
          error: (error: { error: string }) =>
            error.error ?? "Unknown error. Try again later.",
        },
      );
      router.refresh();
    } catch (error) {
      console.error("Error reordering projects:", error);
      toast.error("Failed to save new order. Please try again.");
    }
  };
  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Sortable key={project.id} project={project} index={index} />
        ))}
      </div>
    </DragDropProvider>
  );
};

export default ProjectCard;

const Sortable = ({ project, index }: { project: Project; index: number }) => {
  const { ref, handleRef, isDragging } = useSortable({ id: project.id, index });
  return (
    <Card
      ref={ref}
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
        <div className="flex-1 w-full sm:w-1/2 h-full p-2 flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((tech: string) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <ToggleStar project={project} isDragging={isDragging} />
            <Button
              variant="edit"
              size="icon"
              title="Edit project"
              disabled={isDragging}
            >
              <Link href={`/admin/projects/edit/${project.id}`}>
                <Pencil />
              </Link>
            </Button>
            <ToggleArchive project={project} isDragging={isDragging} />
            <DeleteProject
              projectId={project.id}
              projectTitle={project.title}
              isDragging={isDragging}
            />
            <Button
              ref={handleRef}
              size="icon"
              variant="ghost"
              title="Drag to reorder"
              className="cursor-grab active:cursor-grabbing"
            >
              <GripVertical />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
