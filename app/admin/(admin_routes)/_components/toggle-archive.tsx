"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveX, Loader2 } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ToggleArchive = ({
  project,
  isDragging,
}: {
  project: Project;
  isDragging: boolean;
}) => {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const handleArchive = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify({
          archived: !project.archived,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      toast.success("Project updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to update project", error);
      toast.error("Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Button
      variant="archive"
      size="icon"
      disabled={isDragging}
      title={project.archived ? "Unarchive project" : "Archive project"}
      onClick={handleArchive}
    >
      {updating ? (
        <Loader2 className="animate-spin" />
      ) : project.archived ? (
        <ArchiveX />
      ) : (
        <Archive />
      )}
    </Button>
  );
};

export default ToggleArchive;
