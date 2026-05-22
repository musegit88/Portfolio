"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveX, Loader2 } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";

const ToggleArchive = ({ project }: { project: Project }) => {
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
      // TODO: add toast notification
      alert("Project updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to update project", error);
      // TODO: add toast notification
      alert(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Button
      variant="archive"
      size="icon"
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
