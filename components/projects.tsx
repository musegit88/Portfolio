import { Suspense } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { CgWebsite } from "react-icons/cg";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { prisma } from "@/lib/prisma";

import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const Projects = async ({ user }: { user?: Session["user"] }) => {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsContent user={user} />
    </Suspense>
  );
};

export default Projects;

const ProjectsContent = async ({ user }: { user?: Session["user"] }) => {
  let dbProjects: any[] = [];
  try {
    dbProjects = await prisma.project.findMany({
      where: {
        featured: true,
        archived: false,
      },
      orderBy: {
        order: "asc",
      },
    });
  } catch (error) {
    console.warn("Failed to fetch DB projects:", error);
  }

  const projectsToDisplay = dbProjects.map((p) => ({
    id: String(p.id),
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    demoUrl: p.demoUrl,
    technologies: p.technologies || [],
  }));

  return (
    <section id="projects" className="relative py-16 sm:py-24 snap-start snap-always scroll-mt-20 pt-20 flex flex-col items-center justify-start overflow-hidden">
      {/* Grid Texture Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      {/* Top & bottom fade to blend with adjacent sections */}
      <div className="absolute top-0 inset-x-0 h-32 -z-10 bg-linear-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 -z-10 bg-linear-to-t from-background to-transparent pointer-events-none" />

      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-center">
          <h5 className="text-xl font-medium">Projects</h5>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Selected projects — click any card to view detailed interactive showcase
        </p>
      </div>

      {projectsToDisplay.length > 0 ? (
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full relative z-10">
          {projectsToDisplay.map((project) => (
            <div key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className="group block relative w-full h-64 overflow-hidden rounded-xl shadow-md border border-border transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50"
              >
                <Image
                  src={project.imageUrl}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={project.title}
                  className="object-cover object-top w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Hover CTA Indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <span>View Showcase</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>

                <div className="absolute flex flex-col justify-end h-full text-white p-5 inset-0">
                  <div className="mb-2 flex flex-col gap-2 w-full">
                    <h4
                      title={project.title}
                      className="line-clamp-1 font-bold text-lg transition-colors"
                    >
                      {project.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.technologies.slice(0, 4).map((item: string, index: number) => (
                        <span
                          key={index}
                          className="text-[11px] font-medium text-slate-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] font-medium text-white/80 bg-black/40 px-1.5 py-0.5 rounded-md">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-2">
                    {project.description}
                  </p>

                  {project.demoUrl && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span>{project.demoUrl.replace("https://", "")}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-center w-full">
          {user ? (
            <div className="flex items-center justify-center gap-2">
              <p>Manage Projects from </p>
              <Button asChild>
                <Link href="/admin/dashboard">Dashboard</Link>
              </Button>
            </div>
          ) : (
            <p>🤭 Oops! Nothing to show.</p>
          )}
        </div>
      )}
    </section>
  );
};

const ProjectsSkeleton = async () => {
  const projects = await prisma.project.count();
  return (
    <section className="flex flex-col gap-y-4 mt-28">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-40 h-6 bg-gray-500/40" />
        <Skeleton className="w-32 h-4 bg-gray-500/40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: projects }).map((_, index) => (
          <div key={index}>
            <div className="w-full h-60">
              <Skeleton className="w-full h-full bg-gray-500/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
