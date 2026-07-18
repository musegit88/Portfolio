"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader, Type, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Setting } from "@/generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextLogoConfig {
  text: string;
  font: string;
  bold: boolean;
  badge: "none" | "boxed" | "gradient";
}
import { toast } from "sonner";

const SiteSettingsTab = ({ settings }: { settings: Setting | null }) => {
  const router = useRouter();

  // Determine if initial logo is a text logo
  const isInitialTextLogo = settings?.logoUrl?.startsWith("textlogo:") || false;

  // Parse the initial text logo configuration if it exists
  const initialTextLogoConfig = useMemo<TextLogoConfig>(() => {
    if (settings?.logoUrl?.startsWith("textlogo:")) {
      try {
        return JSON.parse(settings?.logoUrl.replace("textlogo:", ""));
      } catch (error) {
        console.error("Failed to parse stored text logo config");
      }
    }
    return {
      text: "",
      font: "font-sans",
      bold: true,
      badge: "none",
    };
  }, [settings]);

  const [logoType, setLogoType] = useState<"text" | "image">(
    isInitialTextLogo ? "text" : "image",
  );
  const [textLogoConfig, setTextLogoConfig] = useState<TextLogoConfig>(
    initialTextLogoConfig,
  );

  // initial values
  const initialValues = useMemo(
    () => ({
      siteTitle: settings?.siteTitle || "",
      siteDescription: settings?.siteDescription || "",
      // If text logo is used, initial image logoUrl is empty
      logoUrl: isInitialTextLogo ? "" : settings?.logoUrl || "",
    }),
    [settings, isInitialTextLogo],
  );
  // form data state
  const [formData, setFormData] = useState(initialValues);
  // local logo state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  // local logo preview state
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  // check if form has changes
  const [isChanged, setIsChanged] = useState(false);
  // loading state
  const [loading, setLoading] = useState(false);
  // image uploading state
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const isLogoTypeChanged =
      logoType !== (isInitialTextLogo ? "text" : "image");

    let isLogoConfigChanged = false;
    if (logoType === "text") {
      isLogoConfigChanged =
        textLogoConfig.text !== initialTextLogoConfig.text ||
        textLogoConfig.font !== initialTextLogoConfig.font ||
        textLogoConfig.bold !== initialTextLogoConfig.bold ||
        textLogoConfig.badge !== initialTextLogoConfig.badge;
    } else {
      // If Image Logo is selected, check if a new image was selected or if the image URL changed
      isLogoConfigChanged =
        logoFile !== null || formData.logoUrl !== initialValues.logoUrl;
    }

    // check if form has changes
    const hasChanges =
      formData.siteTitle !== initialValues.siteTitle ||
      formData.siteDescription !== initialValues.siteDescription ||
      isLogoTypeChanged ||
      isLogoConfigChanged;

    setIsChanged(hasChanges);
  }, [
    formData,
    initialTextLogoConfig.badge,
    initialTextLogoConfig.bold,
    initialTextLogoConfig.font,
    initialTextLogoConfig.text,
    initialValues,
    isInitialTextLogo,
    logoFile,
    logoType,
    textLogoConfig.badge,
    textLogoConfig.bold,
    textLogoConfig.font,
    textLogoConfig.text,
  ]);

  // Safely create and revoke the logo preview URL to prevent memory leaks
  useEffect(() => {
    if (!logoFile) {
      setLogoPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreviewUrl(objectUrl);

    // cleanup function to revoke the object URL when the component unmounts or imageFile changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  const uploadLogo = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/settings/site-settings/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload image");
      }
      const data = await response.json();
      toast.success("Image uploaded successfully");
      return data.logoUrl;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let logoUrl = formData.logoUrl;
    if (logoType === "text") {
      // Save text logo config serialized into the URL column
      logoUrl = `textlogo:${JSON.stringify(textLogoConfig)}`;
    } else if (logoFile) {
      setIsUploading(true);
      try {
        // upload new logo image and use the returned URL
        logoUrl = await uploadLogo(logoFile);
      } catch (error) {
        setIsUploading(false);
        return;
      }
    }
    setIsUploading(false);

    setLoading(true);
    try {
      const response = await fetch(
        `/api/settings/site-settings/${settings?.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: settings?.id,
            siteTitle: formData.siteTitle,
            siteDescription: formData.siteDescription,
            logoUrl,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update site settings");
      }
      toast.success("Site settings updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating site settings:", error);
      toast.error("Failed to update site settings");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full h-fit">
      <form onSubmit={handleSaveChanges}>
        <CardHeader>
          <CardTitle>Site & SEO</CardTitle>
          <CardAction>
            {" "}
            <Button
              type="submit"
              disabled={!isChanged || isUploading || loading}
            >
              {isUploading || loading ? (
                <>
                  <Loader className="animate-spin" />
                  {isUploading && <span className="ml-2"> Uploading...</span>}
                  {loading && <span className="ml-2">Saving</span>}
                </>
              ) : (
                "Save"
              )}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    type="text"
                    value={formData.siteTitle}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        siteTitle: e.target.value,
                      }));
                    }}
                  />
                </Field>
                <Field>
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    value={formData.siteDescription}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        siteDescription: e.target.value,
                      }));
                    }}
                  />
                </Field>
                <Field>
                  <FieldLabel>Logo Type</FieldLabel>
                  <FieldDescription>Choose logo type</FieldDescription>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={logoType === "image" ? "default" : "outline"}
                      onClick={() => {
                        setLogoType("image");
                      }}
                    >
                      <Upload />
                      <span>Upload Logo</span>
                    </Button>
                    <Button
                      type="button"
                      variant={logoType === "text" ? "default" : "outline"}
                      onClick={() => {
                        setLogoType("text");
                      }}
                    >
                      <Type />
                      <span>Text Logo</span>
                    </Button>
                  </div>
                  {logoType === "image" && (
                    <div>
                      <div className="max-sm:w-full w-52 h-24 relative">
                        {logoPreviewUrl && (
                          <Image
                            src={logoPreviewUrl}
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain rounded-md"
                          />
                        )}

                        {/* if logo is uploaded */}
                        {formData.logoUrl && !logoFile && (
                          <Image
                            src={formData.logoUrl}
                            alt="Logo"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        <FieldLabel
                          htmlFor="logo"
                          className={cn(
                            "absolute inset-0 flex justify-center max-sm:w-full w-52 h-full border border-input rounded-md whitespace-nowrap cursor-pointer hover:bg-gray-500/40 transition-all duration-300 ease-in-out",
                            logoFile ||
                              (formData.logoUrl &&
                                "opacity-0 hover:opacity-100"),
                          )}
                        >
                          <Upload />
                          <span className="text-sm">
                            {logoFile || formData.logoUrl
                              ? "Change logo"
                              : "Upload logo"}
                          </span>
                        </FieldLabel>
                      </div>
                      <Input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setLogoFile(e.target.files?.[0] || null)
                        }
                        className="hidden"
                      />
                    </div>
                  )}
                  {logoType === "text" && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Field className="max-sm:w-full w-52">
                        <Label>Logo Text</Label>
                        <Input
                          value={textLogoConfig.text}
                          maxLength={20}
                          onChange={(e) =>
                            setTextLogoConfig((prev) => ({
                              ...prev,
                              text: e.target.value,
                            }))
                          }
                        />
                        <div>
                          <Label className="mb-2">Font Family</Label>
                          <Select
                            defaultValue={textLogoConfig.font}
                            onValueChange={(value) =>
                              setTextLogoConfig((prev) => ({
                                ...prev,
                                font: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Font Family" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="font-sans">
                                Modern Sans (Inter)
                              </SelectItem>
                              <SelectItem value="font-serif">
                                Elegant Serif (Playfair)
                              </SelectItem>
                              <SelectItem value="font-mono">
                                Developer Mono (JetBrains)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="mb-2">Badge Style</Label>
                          <Select
                            defaultValue={textLogoConfig.badge}
                            onValueChange={(value) =>
                              setTextLogoConfig((prev) => ({
                                ...prev,
                                badge: value as "none" | "boxed" | "gradient",
                              }))
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Badge Style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="boxed">Boxed</SelectItem>
                              <SelectItem value="gradient">Gradient</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </Field>
                      <div className="w-full flex flex-col items-center justify-center border border-dashed rounded-lg p-6 bg-muted/40">
                        <span className="text-xs text-muted-foreground mb-4">
                          Live Preview
                        </span>

                        <div className="p-4 bg-background border rounded-md flex items-center justify-center w-full max-w-[200px]">
                          {/* Logo Preview */}
                          <div
                            className={`flex items-center gap-1 font-bold text-lg tracking-tight ${textLogoConfig.font}`}
                          >
                            {textLogoConfig.badge === "none" ? (
                              <span>{textLogoConfig.text}</span>
                            ) : textLogoConfig.badge === "boxed" ? (
                              <span className="bg-foreground text-background px-2 py-1 rounded-md text-sm">
                                {textLogoConfig.text}
                              </span>
                            ) : (
                              <span className="bg-linear-to-r from-violet-600 to-indigo-600 text-white px-2 py-1 rounded-md text-sm">
                                {textLogoConfig.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </CardContent>
      </form>
    </Card>
  );
};

export default SiteSettingsTab;
