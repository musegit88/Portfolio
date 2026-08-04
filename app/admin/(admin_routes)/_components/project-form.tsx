"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader, Plus, Trash2, Upload } from "lucide-react";

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
import { toast } from "sonner";

const ProjectForm = ({ project }: { project?: Project }) => {
  const router = useRouter();
  // initial values
  // ── Types for dynamic list fields ──
  type FeatureItem = { title: string; description: string };
  type MetricItem = { label: string; value: string };

  const initialValues = useMemo(
    () => ({
      title: project?.title || "",
      description: project?.description || "",
      fullDescription: project?.fullDescription || "",
      imageUrl: project?.imageUrl || "",
      demoUrl: project?.demoUrl || "",
      githubUrl: project?.githubUrl || "",
      technologies: project?.technologies || ([] as string[]),
      archived: project?.archived || false,
      featured: project?.featured || false,
      category: project?.category || "",
      role: project?.role || "",
      duration: project?.duration || "",
      status: project?.status || "Production",
      metrics: project?.metrics || "",
      features: project?.features || "",
      challenges:
        Array.isArray(project?.challenges) && project.challenges.length > 0
          ? (project.challenges as string[]).join("\n")
          : "",
    }),
    [project],
  );

  // ── Features dynamic list ──
  const parseFeatures = (): FeatureItem[] => {
    if (!project?.features) return [];
    try {
      const parsed = typeof project.features === "string"
        ? JSON.parse(project.features)
        : project.features;
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  };
  const [features, setFeatures] = useState<FeatureItem[]>(parseFeatures);

  const addFeature = () =>
    setFeatures((prev) => [...prev, { title: "", description: "" }]);
  const removeFeature = (i: number) =>
    setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  const updateFeature = (i: number, field: keyof FeatureItem, val: string) =>
    setFeatures((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, [field]: val } : f))
    );

  // ── Metrics dynamic list ──
  const parseMetrics = (): MetricItem[] => {
    if (!project?.metrics) return [];
    try {
      const parsed = typeof project.metrics === "string"
        ? JSON.parse(project.metrics)
        : project.metrics;
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  };
  const [metrics, setMetrics] = useState<MetricItem[]>(parseMetrics);

  const addMetric = () =>
    setMetrics((prev) => [...prev, { label: "", value: "" }]);
  const removeMetric = (i: number) =>
    setMetrics((prev) => prev.filter((_, idx) => idx !== i));
  const updateMetric = (i: number, field: keyof MetricItem, val: string) =>
    setMetrics((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m))
    );
  // image file state
  const [imageFile, setImageFile] = useState<File | null>(null);
  // image preview url state
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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
      formData.featured !== initialValues.featured ||
      formData.fullDescription !== initialValues.fullDescription ||
      formData.category !== initialValues.category ||
      formData.role !== initialValues.role ||
      formData.duration !== initialValues.duration ||
      formData.status !== initialValues.status ||
      formData.challenges !== initialValues.challenges ||
      JSON.stringify(features) !== JSON.stringify(initialValues.features) ||
      JSON.stringify(metrics) !== JSON.stringify(initialValues.metrics);

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
  }, [formData, initialValues, imageFile, features, metrics]);

  // Safely create and revoke the image preview URL to prevent memory leaks
  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);

    // cleanup function to revoke the object URL when the component unmounts or imageFile changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  // supabase image upload
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload image");
      }
      const data = await response.json();
      toast.success("Image uploaded successfully");
      return data.imageUrl;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check if image is selected for upload
    if (!project && !imageFile) {
      toast.info("Please upload image for the project");
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
      toast.error("Failed to upload image");
      return;
    }

    setLoading(true);
    // Build the enriched payload — convert challenges textarea text to array
    const showcasePayload = {
      ...formData,
      imageUrl,
      challenges: formData.challenges
        ? formData.challenges
          .split("\n")
          .map((c: string) => c.trim())
          .filter(Boolean)
        : [],
      features: features.filter((f) => f.title.trim() || f.description.trim()),
      metrics: metrics.filter((m) => m.label.trim() || m.value.trim()),
    };

    // if project is defined, update it
    if (project) {
      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "PUT",
          body: JSON.stringify(showcasePayload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update project");
        }

        toast.success("Project updated successfully");
        // Redirect to dashboard on success
        if (response.ok) {
          router.push("/admin/dashboard");
          router.refresh();
        }
      } catch (error) {
        console.error("Error updating project:", error);
        toast.error("Failed to update project");
      } finally {
        setLoading(false);
      }
    }
    // if project is not defined, add it
    else {
      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          body: JSON.stringify(showcasePayload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to add project");
        }
        toast.success("Project added successfully");
        // Redirect to dashboard on success
        router.push("/admin/dashboard");
        router.refresh();
      } catch (error) {
        console.error("Error adding project:", error);
        toast.error("Failed to add project");
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
            <div className="flex flex-col sm:flex-row items-center gap-2">
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
                  className="resize-none h-44"
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
                      {imagePreviewUrl && (
                        <Image
                          src={imagePreviewUrl}
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
                      <span className="text-sm">
                        {imagePreviewUrl || formData.imageUrl
                          ? "Change image"
                          : "Upload image"}
                      </span>
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
            <div className="flex flex-col sm:flex-row items-center gap-2">
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

            {/* ── Showcase Detail Fields ── */}
            <FieldSet>
              <FieldLegend className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-4 pb-1 border-t border-border">
                Project Showcase Details
              </FieldLegend>
              <FieldDescription className="text-xs mb-4">
                These optional fields power the interactive showcase page for this project.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="fullDescription">Full Description</FieldLabel>
                  <FieldDescription>
                    A detailed paragraph describing the project goals, design, and impact.
                  </FieldDescription>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    rows={5}
                    value={formData.fullDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, fullDescription: e.target.value })
                    }
                    className="resize-none"
                    placeholder="This project was built to solve..."
                  />
                </Field>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Input
                      id="category"
                      name="category"
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="e.g. Full Stack Web Application"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="role">My Role</FieldLabel>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      placeholder="e.g. Lead Full Stack Developer"
                    />
                  </Field>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Field>
                    <FieldLabel htmlFor="duration">Duration / Timeline</FieldLabel>
                    <Input
                      id="duration"
                      name="duration"
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="e.g. 2 Months"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Input
                      id="status"
                      name="status"
                      type="text"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      placeholder="e.g. Production"
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="challenges">Engineering Challenges</FieldLabel>
                  <FieldDescription>
                    One challenge per line. These will appear in the showcase Overview tab.
                  </FieldDescription>
                  <Textarea
                    id="challenges"
                    name="challenges"
                    rows={4}
                    value={formData.challenges}
                    onChange={(e) =>
                      setFormData({ ...formData, challenges: e.target.value })
                    }
                    className="resize-none"
                    placeholder={`Optimizing database query performance.\nEnsuring sub-second render times on mobile.`}
                  />
                </Field>

                {/* ── Features ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <FieldLabel>Key Features</FieldLabel>
                      <FieldDescription className="mt-0.5">
                        Highlight what this project does well. Shown in the Features tab.
                      </FieldDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFeature}
                      className="gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Feature
                    </Button>
                  </div>

                  {features.length === 0 && (
                    <p className="text-xs text-muted-foreground py-3 text-center border border-dashed border-border rounded-lg">
                      No features yet — click &ldquo;Add Feature&rdquo; to start.
                    </p>
                  )}

                  <div className="space-y-3">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="group relative p-4 rounded-lg border border-border bg-muted/30 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-muted-foreground w-5 shrink-0">
                            #{i + 1}
                          </span>
                          <Input
                            id={`feature-title-${i}`}
                            type="text"
                            value={feature.title}
                            onChange={(e) => updateFeature(i, "title", e.target.value)}
                            placeholder="Feature title"
                            className="flex-1 h-8 text-sm"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFeature(i)}
                            className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <Textarea
                          id={`feature-desc-${i}`}
                          value={feature.description}
                          onChange={(e) => updateFeature(i, "description", e.target.value)}
                          placeholder="What does this feature do?"
                          rows={2}
                          className="resize-none text-sm ml-7"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Metrics ── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <FieldLabel>Key Metrics</FieldLabel>
                      <FieldDescription className="mt-0.5">
                        Numbers that showcase impact. Shown in the metrics banner.
                      </FieldDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMetric}
                      className="gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Metric
                    </Button>
                  </div>

                  {metrics.length === 0 && (
                    <p className="text-xs text-muted-foreground py-3 text-center border border-dashed border-border rounded-lg">
                      No metrics yet — click &ldquo;Add Metric&rdquo; to start.
                    </p>
                  )}

                  <div className="space-y-2">
                    {metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30"
                      >
                        <span className="text-xs font-semibold text-muted-foreground w-5 shrink-0">
                          #{i + 1}
                        </span>
                        <Input
                          id={`metric-label-${i}`}
                          type="text"
                          value={metric.label}
                          onChange={(e) => updateMetric(i, "label", e.target.value)}
                          placeholder="Label (e.g. Page Speed)"
                          className="flex-1 h-8 text-sm"
                        />
                        <Input
                          id={`metric-value-${i}`}
                          type="text"
                          value={metric.value}
                          onChange={(e) => updateMetric(i, "value", e.target.value)}
                          placeholder="Value (e.g. < 1s)"
                          className="w-32 h-8 text-sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMetric(i)}
                          className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

              </FieldGroup>
            </FieldSet>

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
            <div className="flex flex-col sm:flex-row sm:items-center items-end gap-2">
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

export default ProjectForm;
