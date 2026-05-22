"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";

const ToggleStar = ({ project }: { project: Project }) => {
  const router = useRouter();

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const handleFeatured = async (
    projectId: string,
    projectFeatured: boolean,
  ) => {
    setUpdatingId(projectId);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify({
          featured: !projectFeatured,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      // TODO: add toast notification
      // alert("Project updated successfully");
      router.refresh();
    } catch (error) {
      console.error("", error);
      // TODO: add toast notification
      alert(error);
    } finally {
      setUpdatingId(null);
    }
  };
  return (
    <div>
      {" "}
      <Button
        variant="star"
        size="icon"
        title={project.featured ? "Unmark as featured" : "Mark as featured"}
        onClick={() => handleFeatured(project.id, project.featured)}
      >
        {project.id === updatingId ? (
          <Loader2 className="animate-spin" />
        ) : project.featured ? (
          <Star className="fill-yellow-600" />
        ) : (
          <Star />
        )}
      </Button>
    </div>
  );
};

export default ToggleStar;
