"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader, Upload } from "lucide-react";

import { Project } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { webDevTechs } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";

const Form = ({ project }: { project?: Project }) => {
  const router = useRouter();
  // image file state
  const [imageFile, setImageFile] = useState<File | null>(null);

  const initialValues = useMemo(
    () => ({
      title: project?.title || "",
      description: project?.description || "",
      imageUrl: project?.imageUrl || "",
      demoUrl: project?.demoUrl || "",
      githubUrl: project?.githubUrl || "",
      technologies: project?.technologies || ([] as string[]),
      archived: project?.archived || false,
      featured: project?.featured || false,
    }),
    [project],
  );

  // form data state
  const [formData, setFormData] = useState(initialValues);

  // check if form has changes
  const [isChanged, setIsChanged] = useState(false);

  // loading states
  const [loading, setLoading] = useState(false);

  // image uploading state
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // check if string/boolean values changed
    const isDataChanged =
      formData.title !== initialValues.title ||
      formData.description !== initialValues.description ||
      formData.demoUrl !== initialValues.demoUrl ||
      formData.githubUrl !== initialValues.githubUrl ||
      formData.archived !== initialValues.archived ||
      formData.featured !== initialValues.featured;

    // since 'technologies' is an array, compare its length and contents
    const isTechStackChanged =
      formData.technologies.length !== initialValues.technologies.length ||
      !formData.technologies.every((tech) =>
        initialValues.technologies.includes(tech),
      );

    // check if image has changed
    const isImageChanged = imageFile !== null;

    // The form has changes if any of the above has changed
    const hasChanges = isDataChanged || isTechStackChanged || isImageChanged;

    setIsChanged(hasChanges);
  }, [formData, initialValues, imageFile]);

  // supabase image upload
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // TODO: Add toast notification
      alert("Failed to upload image");
    }
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check if image is selected for upload
    if (!project && !imageFile) {
      // TODO: Add toast notification
      alert("Please upload an image for the project");
      return;
    }

    setIsUploading(true);
    // get image url from form data
    let imageUrl = formData.imageUrl;
    // if image is selected for upload, upload it
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    setIsUploading(false);

    // check if image is uploaded
    if (!imageUrl) {
      // TODO: Add toast notification
      alert("Failed to upload image");
      return;
    }

    setLoading(true);
    // if project is defined, update it
    if (project) {
      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...formData, imageUrl }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const data = await response.json();
          // TODO: Add toast notification
          throw new Error(data.error || "Failed to update project");
        }

        // Redirect to dashboard on success
        if (response.ok) {
          router.push("/admin/dashboard");
          router.refresh();
        }
      } catch (error) {
        console.error("Error updating project:", error);
        // TODO: Add toast notification
        alert("Failed to update project");
      } finally {
        setLoading(false);
      }
    }
    // if project is not defined, add it
    else {
      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          body: JSON.stringify({ ...formData, imageUrl }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const data = await response.json();
          // TODO: Add toast notification
          throw new Error(data.error || "Failed to add project");
        }
        alert("Project updated successfully");
        // Redirect to dashboard on success
        router.push("/admin/dashboard");
        router.refresh();
      } catch (error) {
        console.error("Error adding project:", error);
        // TODO: Add toast notification
        alert("Failed to add project");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{project ? "Edit Project" : "Add Project"}</FieldLegend>
          <FieldGroup>
            <Field className="max-w-md">
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <FieldDescription>
                Enter the title of the project
              </FieldDescription>
              <Input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Field>
            <div className="flex flex-col sm:flex-row items-center">
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <FieldDescription>
                  Enter the description of the project
                </FieldDescription>
                <Textarea
                  id="description"
                  name="description"
                  rows={8}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="resize-none"
                />
              </Field>
              <div className="flex flex-col w-full gap-2">
                <Field>
                  <FieldLabel>Image</FieldLabel>
                  <FieldDescription>
                    Upload the image of the project
                  </FieldDescription>

                  <div className="relative max-sm:h-44">
                    <div className="flex justify-center rounded-md h-full sm:h-44 border border-input whitespace-nowrap cursor-pointer">
                      {/* if image is selected for upload */}
                      {imageFile && (
                        <Image
                          src={URL.createObjectURL(imageFile)}
                          alt="Project Image"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-top rounded-md"
                        />
                      )}
                      {/* if image is uploaded */}
                      {formData.imageUrl && !imageFile && (
                        <Image
                          src={formData.imageUrl}
                          alt="Project Image"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-top rounded-md"
                        />
                      )}
                    </div>
                    <FieldLabel
                      htmlFor="image"
                      className={cn(
                        "absolute inset-0 flex justify-center w-full h-full border border-input rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-500/40 transition-all duration-300 ease-in-out",
                        imageFile && "opacity-0 hover:opacity-100",
                      )}
                    >
                      <Upload />
                      <span className="text-sm">Upload an image</span>
                    </FieldLabel>
                  </div>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </Field>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <Field>
                <FieldLabel htmlFor="demo">Demo Link</FieldLabel>
                <Input
                  id="demo"
                  name="demo"
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, demoUrl: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="github">Github Link</FieldLabel>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="techStack">Tech Stack</FieldLabel>
              <MultiSelect
                values={formData.technologies}
                onValuesChange={(value) =>
                  setFormData({ ...formData, technologies: value })
                }
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue
                    overflowBehavior="cutoff"
                    placeholder="Select Tech Stack"
                  />
                </MultiSelectTrigger>
                <MultiSelectContent
                  search={{
                    emptyMessage: "No Tech Stack Found",
                    placeholder: "Search Tech Stack....",
                  }}
                  className="max-w-md"
                >
                  <MultiSelectGroup>
                    {webDevTechs.map((tech) => (
                      <MultiSelectItem key={tech.value} value={tech.value}>
                        {tech.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="archived"
                name="archived"
                checked={formData.archived as boolean}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, archived: checked as boolean })
                }
              />
              <FieldLabel htmlFor="archived">Archived</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="featured"
                name="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked as boolean })
                }
              />
              <FieldLabel htmlFor="featured">Featured</FieldLabel>
            </Field>
            <div className="flex flex-col sm:flex-row sm:items-center items-end">
              {project ? (
                <p className="text-sm text-muted-foreground">
                  You can reorder projects later from the dashboard.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  New projects are automatically added to the end of your
                  portfolio. You can reorder projects later from the dashboard.
                </p>
              )}
              <Field
                orientation="horizontal"
                className="flex justify-end w-fit"
              >
                <Button type="button" variant="outline">
                  <Link href={"/admin/dashboard"}>Cancel</Link>
                </Button>
                <Button
                  disabled={loading || isUploading || !isChanged}
                  type="submit"
                  variant="default"
                >
                  {project &&
                    (isUploading
                      ? "Uploading Image"
                      : loading
                        ? "Updating"
                        : "Update")}
                  {!project &&
                    (isUploading
                      ? "Uploading Image"
                      : loading
                        ? "Submitting"
                        : "Submit")}
                  {(loading || isUploading) && (
                    <Loader className="animate-spin" />
                  )}
                </Button>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default Form;
