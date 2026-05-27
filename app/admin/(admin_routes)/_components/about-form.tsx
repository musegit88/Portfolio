"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { About } from "@/generated/prisma/client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AboutForm = ({ about }: { about: About }) => {
  const router = useRouter();
  // initial values
  const initialValues = useMemo(
    () => ({
      name: about.name || "",
      title: about.title || "",
      bio: about.bio || "",
      email: about.email || "",
      github: about.github || "",
      linkedin: about.linkedin || "",
      x: about.x || "",
      avatarUrl: about.avatarUrl || "",
      resumeUrl: about.resumeUrl || "",
    }),
    [about],
  );
  // form data state
  const [formData, setFormData] = useState(initialValues);
  // check if form has changes
  const [isChanged, setIsChanged] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isDataChanged =
      formData.name !== initialValues.name ||
      formData.title !== initialValues.title ||
      formData.bio !== initialValues.bio ||
      formData.email !== initialValues.email ||
      formData.github !== initialValues.github ||
      formData.linkedin !== initialValues.linkedin ||
      formData.x !== initialValues.x ||
      formData.avatarUrl !== initialValues.avatarUrl ||
      formData.resumeUrl !== initialValues.resumeUrl;
    const isImageChanged = imageFile !== null;

    const hasChanges = isDataChanged || isImageChanged;

    setIsChanged(hasChanges);
  }, [formData, initialValues, imageFile]);

  // Safely create and revoke the image preview URL to prevent memory leaks
  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);

    // Cleanup function to revoke the object URL when the component unmounts or imageFile changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  // supbase image upload
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/about/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload image");
      }
      const data = await response.json();
      return data.avatarUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about.avatarUrl && !imageFile) {
      toast.info("Please upload an image");
      return;
    }

    // upload image
    setIsUploading(true);
    let avatarUrl = formData.avatarUrl;
    // if image is selected for upload, upload it
    if (imageFile) {
      avatarUrl = await uploadImage(imageFile);
    }
    setIsUploading(false);

    setLoading(true);
    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        body: JSON.stringify({ ...formData, avatarUrl, id: about?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update about");
      }
      toast.success("About updated successfully");
      router.push("/admin/dashboard");
      // refresh the page
      router.refresh();
    } catch (error) {
      console.error("Error updating about:", error);
      toast.error("Failed to update about");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Edit about</FieldLegend>
          <FieldGroup>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="w-fit">
                <Field className="w-44 h-44 border rounded-full">
                  <div className="relative">
                    <div className="flex justify-center h-44 cursor-pointer rounded-full overflow-hidden">
                      {imagePreviewUrl && (
                        <Image
                          src={imagePreviewUrl}
                          alt="avatar"
                          width={500}
                          height={500}
                          unoptimized
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                      {formData.avatarUrl && !imageFile && (
                        <Image
                          src={formData.avatarUrl}
                          alt="avatar"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                    </div>
                    <FieldLabel
                      htmlFor="avatar"
                      className={cn(
                        "absolute inset-0 w-full flex justify-center border border-input cursor-pointer rounded-full bg-gray-500/10 hover:bg-gray-500/40 transition-all duration-300 ease-in-out",
                        imagePreviewUrl && "opacity-0 hover:opacity-100",
                      )}
                    >
                      <Upload />
                      <span className="text-sm">
                        {imagePreviewUrl || formData.avatarUrl
                          ? "Change image"
                          : "Upload image"}
                      </span>
                    </FieldLabel>
                    <Input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                  </div>
                </Field>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Field className="max-w-md">
                  <FieldLabel>Name</FieldLabel>
                  <FieldDescription>Enter your name</FieldDescription>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. John Doe"
                  />
                </Field>
                <Field className="max-w-md">
                  <FieldLabel>Title</FieldLabel>
                  <FieldDescription>Enter your title</FieldDescription>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Software Engineer"
                  />
                </Field>
              </div>
            </div>{" "}
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <FieldDescription>Enter your bio</FieldDescription>
              <Textarea
                id="bio"
                name="bio"
                rows={8}
                required
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="e.g. Software Engineer"
                className="resize-none"
              />
            </Field>
            <div className="flex flex-col sm:flex-row">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>Enter your email</FieldDescription>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. mymail@gmail.com"
                />
              </Field>
              <Field>
                <FieldLabel>GitHub</FieldLabel>
                <FieldDescription>Enter your GitHub</FieldDescription>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  placeholder="e.g. https://github.com/johndoe"
                />
              </Field>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Field>
                <FieldLabel>LinkedIn</FieldLabel>
                <FieldDescription>Enter your LinkedIn</FieldDescription>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  placeholder="e.g. https://linkedin.com/in/johndoe"
                />
              </Field>
              <Field>
                <FieldLabel>X</FieldLabel>
                <FieldDescription>Enter your X</FieldDescription>
                <Input
                  id="x"
                  name="x"
                  type="url"
                  value={formData.x}
                  onChange={(e) =>
                    setFormData({ ...formData, x: e.target.value })
                  }
                  placeholder="e.g. https://x.com/johndoe"
                />
              </Field>
            </div>
            <Field className="max-w-md">
              <FieldLabel>Resume URL</FieldLabel>
              <FieldDescription>Enter your resume URL</FieldDescription>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                value={formData.resumeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, resumeUrl: e.target.value })
                }
                placeholder="e.g. https://example.com/resume.pdf"
              />
            </Field>
            <Field orientation="horizontal" className="flex justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/dashboard">cancle</Link>
              </Button>
              <Button
                disabled={loading || isUploading || !isChanged}
                type="submit"
              >
                {isUploading
                  ? "Uploading Image"
                  : loading
                    ? "Updating"
                    : "Update"}
                {(loading || isUploading) && (
                  <Loader className="animate-spin" />
                )}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default AboutForm;
