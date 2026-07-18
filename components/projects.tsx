import { Suspense } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { CgWebsite } from "react-icons/cg";

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
  const projects = await prisma.project.findMany({
    where: {
      featured: true,
      archived: false,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <section className="flex flex-col gap-y-4 mt-28">
      <div>
        <div className="flex items-center gap-4">
          <h5 className="text-xl font-medium">Projects</h5>
          <CgWebsite size={20} />
        </div>
        <p className="text-xs sm:text-sm">Selectd projects</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="group block relative w-full h-60 overflow-hidden rounded shadow-md border transition-transform duration-150 ease-in hover:scale-[1.02] hover:shadow-xl">
                <Image
                  src={project.imageUrl}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={project.title}
                  className="object-cover object-top w-full h-full"
                />
                <div className="absolute w-full h-full  bg-linear-to-t from-black via-black/20 " />
                <div className="absolute flex flex-col justify-end h-full text-white p-4">
                  <div className="mb-2 flex flex-col lg:flex-row lg:items-center gap-2 w-full">
                    <h4
                      title={project.title}
                      className="line-clamp-1 font-semibold"
                    >
                      {project.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((item, index) => (
                        <span
                          key={index}
                          className="text-xs text-black bg-white px-1 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base">{project.description}</p>
                  <a
                    href={project.demoUrl!}
                    target="_blank"
                    className="text-xs sm:text-sm text-slate-400 group-hover:underline"
                  >
                    {project.demoUrl!.replace("https://", "")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-center w-full">
          {user ? (
            <div className="flex items-center justify-center gap-2">
              <p>Manage Skills from </p>
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
