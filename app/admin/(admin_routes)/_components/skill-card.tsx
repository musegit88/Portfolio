"use client";

import { ComponentProps } from "react";
import { isSortableOperation, useSortable } from "@dnd-kit/react/sortable";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getIcon } from "@/lib/icon-mapper";
import { Skill } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import DeleteSkill from "./delete-skill";
import { DragDropProvider } from "@dnd-kit/react";
import { toast } from "sonner";

const SkillCard = ({ skills }: { skills: Skill[] }) => {
  const router = useRouter();

  type onDragEnd = NonNullable<
    ComponentProps<typeof DragDropProvider>["onDragEnd"]
  >;
  const handleDragEnd: onDragEnd = async (event) => {
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
    const reordered = [...skills];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    const payload = reordered.map((skill, index) => ({
      id: skill.id,
      order: index,
    }));
    try {
      toast.promise(
        async () => {
          const response = await fetch("/api/skills/reorder", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skills: payload }),
          });
          if (!response.ok) {
            throw new Error("Failed to save new order. Please try again.");
          }
          return response.json();
        },
        {
          loading: "Saving new order...",
          success: (res: { message: string }) => res.message,
          error: (error: { error: string }) =>
            error.error ?? "Unknown error. Try again later.",
        },
      );
      router.refresh();
    } catch (error) {
      console.error("Error reordering skills:", error);
      toast.error("Failed to save new order. Please try again.");
    }
  };
  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap w-full gap-4 mt-6">
        {skills.map((skill, index) => (
          <Sortable key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </DragDropProvider>
  );
};

export default SkillCard;

const Sortable = ({ skill, index }: { skill: Skill; index: number }) => {
  const Icon = getIcon(skill.icon);
  const { ref } = useSortable({ id: skill.id, index });
  return (
    <div ref={ref} className="group relative">
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
};
