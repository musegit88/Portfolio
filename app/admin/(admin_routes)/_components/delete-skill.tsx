"use client";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DeleteSkill = ({
  skillId,
  skillName,
}: {
  skillId: string;
  skillName: string;
}) => {
  const router = useRouter();

  //   Delete project
  const handleDeleteSkill = async () => {
    try {
      const response = await fetch(`/api/skills/${skillId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }
      const data = await response.json();
      toast.success(data.message);
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting skill");
      toast.error(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon-sm"
          title="Delete skill"
          className="rounded-full bg-destructive hover:bg-destructive/80 text-destructive-foreground"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong className="text-destructive">{skillName}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSkill}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSkill;
