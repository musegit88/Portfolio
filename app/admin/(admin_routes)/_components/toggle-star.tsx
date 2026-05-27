"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star } from "lucide-react";

import { Project } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
