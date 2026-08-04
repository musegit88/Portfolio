"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Heart,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Globe,
  Maximize2,
  Minimize2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Pencil,
} from "lucide-react";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";

export interface ProjectFeature {
  title: string;
  description: string;
  category?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  fullDescription?: string | null;
  imageUrl: string;
  image?: string | null;
  demoUrl?: string | null;
  href?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured?: boolean;
  order?: number;
  archived?: boolean;
  category?: string | null;
  role?: string | null;
  duration?: string | null;
  status?: string | null;
  features?: ProjectFeature[] | any;
  metrics?: ProjectMetric[] | any;
  challenges?: string[];
  techCategories?: TechCategory[] | any;
}

interface ProjectDetailViewProps {
  project: ShowcaseProject;
  nextProject?: ShowcaseProject | null;
  prevProject?: ShowcaseProject | null;
  user: Session["user"] | null | undefined;
}

export default function ProjectDetailView({
  project,
  nextProject,
  prevProject,
  user,
}: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech">(
    "overview"
  );
  const [viewMode, setViewMode] = useState<"gallery" | "iframe">("gallery");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Project URL copied to clipboard!");
  };

  const demoUrl = project.demoUrl || project.href;
  const githubUrl = project.githubUrl;

  return (
    <main className="min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between py-4 mb-6 border-b border-border/40">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-2">
          {user &&
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/projects/edit/${project.id}`}>
                <Pencil />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </Button>
          }
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2 text-xs sm:text-sm"
          >
            <Share2 />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
              {project.category}
            </span>
          )}
          {project.status && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {project.status}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {project.description}
        </p>

        {/* Technologies badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {project.technologies?.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs font-medium bg-muted rounded-md text-foreground border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {demoUrl && (
            <Button asChild size="lg" className="gap-2 font-semibold shadow-md">
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4" />
                <span>Visit Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </Button>
          )}

          {githubUrl && (
            <Button asChild variant="outline" size="lg" className="gap-2 font-medium">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </Button>
          )}
        </div>
      </header>

      {/* Main Interactive Showcase Media Card */}
      <section className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card mb-12">
        {/* Card View Mode Selector Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 bg-muted/60 border-b border-border text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Interactive Showcase
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("gallery")}
              className={cn("px-3 py-1 rounded-md text-xs font-medium transition-all", viewMode === "gallery"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
              )}
            >
              Media View
            </button>
            {demoUrl && (
              <button
                onClick={() => setViewMode("iframe")}
                className={cn("px-3 py-1 rounded-md text-xs font-medium transition-all", viewMode === "iframe"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                )}
              >
                Live Frame
              </button>
            )}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors ml-2"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div
          className={cn("relative w-full transition-all duration-300", isFullscreen ? "fixed inset-0 z-50 bg-background p-4 flex flex-col" : "h-85 sm:h-120 lg:h-145"
          )}
        >
          {isFullscreen && (
            <div className="flex justify-between items-center mb-2 px-2">
              <span className="text-sm font-semibold">{project.title}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(false)}
              >
                Close Fullscreen
              </Button>
            </div>
          )}

          {viewMode === "gallery" ? (
            <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
              <Image
                src={project.imageUrl || project.image || "/images/slice.png"}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain p-2 sm:p-4"
              />
            </div>
          ) : (
            demoUrl && (
              <iframe
                src={demoUrl}
                title={`${project.title} Live Preview`}
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            )
          )}
        </div>
      </section>

      {/* Metrics Banner */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {project.metrics.map((metric: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center shadow-xs hover:border-primary/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Tabbed Detailed Information Section */}
      <section className="space-y-6 mb-16">
        <div className="flex border-b border-border gap-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn("pb-3 text-sm font-semibold transition-all relative", activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2 text-xs sm:text-sm">
              <Layers className="w-4 h-4" /> Overview & Vision
            </span>
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={cn("pb-3 text-sm font-semibold transition-all relative", activeTab === "features"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Key Features
            </span>
          </button>

          <button
            onClick={() => setActiveTab("tech")}
            className={cn("pb-3 text-sm font-semibold transition-all relative", activeTab === "tech"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Technical Architecture
            </span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="py-2">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Project Summary</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {project.fullDescription || project.description}
                </p>

                {project.challenges && project.challenges.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" /> Key Engineering Challenges
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar Info Card */}
              <div className="p-6 rounded-xl border border-border bg-card space-y-4 h-fit">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Project Metadata
                </h4>
                <div className="space-y-3 text-sm">
                  {project.role && (
                    <div>
                      <div className="text-xs text-muted-foreground">My Role</div>
                      <div className="font-semibold text-foreground">{project.role}</div>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <div className="text-xs text-muted-foreground">Timeline</div>
                      <div className="font-semibold text-foreground">{project.duration}</div>
                    </div>
                  )}
                  {project.category && (
                    <div>
                      <div className="text-xs text-muted-foreground">Category</div>
                      <div className="font-semibold text-foreground">{project.category}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features && project.features.length > 0 ? (
                project.features.map((feature: any, i: number) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Key features are detailed in the project description above.
                </div>
              )}
            </div>
          )}

          {activeTab === "tech" && (
            <div className="space-y-6">
              {project.techCategories && project.techCategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.techCategories.map((cat: any, i: number) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card">
                      <h4 className="text-base font-bold mb-4 flex items-center gap-2 text-primary">
                        <Code2 className="w-4 h-4" /> {cat.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item: any, j: number) => (
                          <span
                            key={j}
                            className="px-3 py-1 text-xs font-medium bg-muted rounded-md border border-border"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h4 className="text-base font-bold mb-4 text-primary">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm font-medium bg-muted rounded-lg border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Next and Previous Project Navigation */}
      <footer className="pt-12 border-t border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group flex flex-col justify-between"
            >
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Previous Project
              </span>
              <span className="text-lg font-bold mt-2 text-foreground group-hover:text-primary transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group flex flex-col justify-end items-end text-right"
            >
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                Next Project <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-lg font-bold mt-2 text-foreground group-hover:text-primary transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </main>
  );
}
