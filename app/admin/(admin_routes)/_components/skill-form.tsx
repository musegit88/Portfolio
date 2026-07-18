"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import { getIcon, iconMap } from "@/lib/icon-mapper";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skill } from "@/generated/prisma/client";
import { toast } from "sonner";

const SkillForm = ({ skill }: { skill?: Skill }) => {
  const router = useRouter();

  // initial values for the form
  const initialValues = useMemo(
    () => ({
      name: skill?.name || "",
      category: skill?.category || "",
      level: skill?.level || 5,
      icon: skill?.icon || "",
    }),
    [skill],
  );

  // form data state
  const [formData, setFormData] = useState(initialValues);

  // check if form has changes
  const [isChanged, setIsChanged] = useState(false);

  // loading states
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isDataChanged =
      formData.name !== initialValues.name ||
      formData.category !== initialValues.category ||
      formData.level !== initialValues.level ||
      formData.icon !== initialValues.icon;

    setIsChanged(isDataChanged);
  }, [formData, initialValues]);

  // handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (skill) {
      try {
        const response = await fetch(`/api/skills/${skill.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update skill");
        }
        toast.success("Skill updated successfully");
        router.push("/admin/dashboard");
        router.refresh();
      } catch (error) {
        console.error("Error updating skill:", error);
        toast.error("Error updating skill");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch("/api/skills", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to add skill");
        }
        toast.success("Skill added successfully");
        router.push("/admin/dashboard");
        router.refresh();
      } catch (error) {
        console.error("Error adding skill:", error);
        toast.error("Error adding skill");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{skill ? "Edit Skill" : "Add Skill"}</FieldLegend>
          <FieldGroup>
            <Field className="max-w-md">
              <FieldLabel htmlFor="skillName">Skill Name</FieldLabel>
              <FieldDescription>Enter the name of the skill</FieldDescription>
              <Input
                id="skillName"
                name="skillName"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. React"
              />
            </Field>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Field>
                <FieldLabel htmlFor="skillCategory">Skill Category</FieldLabel>
                <FieldDescription>
                  Select the category of the skill
                </FieldDescription>
                <Input
                  id="skillCategory"
                  name="skillCategory"
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g. Frontend"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="skillLevel">Skill Level</FieldLabel>
                <FieldDescription>
                  Select the level of the skill
                </FieldDescription>
                <Input
                  id="skillLevel"
                  name="skillLevel"
                  type="number"
                  min={5}
                  max={10}
                  required
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 9"
                />
              </Field>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Field className="max-w-md">
                <FieldLabel htmlFor="skillIcon">Skill Icon</FieldLabel>
                <FieldDescription>
                  Select the icon of the skill
                </FieldDescription>
                <Select
                  value={formData.icon}
                  onValueChange={(value) =>
                    setFormData({ ...formData, icon: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(iconMap).map((icon, idx) => {
                        const Icon = getIcon(icon);

                        return (
                          <SelectItem key={idx} value={icon}>
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className="w-4 h-4" />}
                              <span>{icon}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center items-end gap-2">
              {!skill && (
                <p className="text-sm text-muted-foreground w-full">
                  New skills are added to the end of the list. You can reorder
                  them later from the dashboard.
                </p>
              )}
              <Field
                orientation="horizontal"
                className="flex justify-end w-fit"
              >
                <Button type="button" variant="outline">
                  <Link href="/admin/dashboard">cancel</Link>
                </Button>
                <Button type="submit" disabled={loading || !isChanged}>
                  {skill
                    ? loading
                      ? "Updating"
                      : "Update"
                    : loading
                      ? "Submitting"
                      : "Submit"}
                  {loading && <Loader className="animate-spin" />}
                </Button>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default SkillForm;
