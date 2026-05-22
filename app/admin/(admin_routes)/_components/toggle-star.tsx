"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";

const ToggleStar = ({ project }: { project: Project }) => {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const handleFeatured = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify({
          featured: !project.featured,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      // TODO: add toast notification
      // alert("Project updated successfully");
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
      variant="star"
      size="icon"
      title={project.featured ? "Unmark as featured" : "Mark as featured"}
      onClick={handleFeatured}
    >
      {updating ? (
        <Loader2 className="animate-spin" />
      ) : project.featured ? (
        <Star className="fill-yellow-600" />
      ) : (
        <Star />
      )}
    </Button>
  );
};

export default ToggleStar;
