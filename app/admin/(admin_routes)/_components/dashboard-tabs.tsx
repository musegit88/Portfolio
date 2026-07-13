"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Cog, FolderPlus, Plus } from "lucide-react";

import { About, Project, Skill } from "@/generated/prisma/client";
import { navTabs } from "@/lib/constants";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Overview from "./overview";
import Projects from "./projects";
import Skills from "./skills";
import AboutTab from "./about";

const DashboardTabs = ({
  projectsCount,
  featuredProjectsCount,
  skillsCount,
  projects,
  skills,
  about,
  chartData,
  deviceCategory,
}: {
  projectsCount: number;
  featuredProjectsCount: number;
  skillsCount: number;
  projects: Project[];
  skills: Skill[];
  about: About | null;
  chartData?: any[];
  deviceCategory?: any[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    replace(`${pathname}?${params.toString()}`);
  };
  const activeTab = searchParams.get("tab") ?? "overview";
  return (
    <Tabs
      value={activeTab}
      onValueChange={handleSearchParams}
      className="flex flex-col items-center justify-center"
    >
      <TabsList className="sm:w-[500px] mb-4">
        {navTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="overview" className="w-full">
        <Overview
          projectsCount={projectsCount}
          featuredProjectsCount={featuredProjectsCount}
          skillsCount={skillsCount}
          chartData={chartData}
          deviceCategory={deviceCategory}
        />
      </TabsContent>
      <TabsContent value="projects">
        {projects.length > 0 ? (
          <Projects projects={projects} />
        ) : (
          <div className="mt-24 flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-muted">
              <FolderPlus />
            </div>
            <h4 className="text-xl font-semibold">No projects yet</h4>
            <p className="text-muted-foreground text-center">
              You haven&apos;t added any projects yet. Get started by adding
              your first project.
            </p>
            <Button asChild className="mb-4" title="Add Project">
              <Link href="/admin/projects/add">
                <Plus className="mr-2" />
                Add Project
              </Link>
            </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value="skills">
        {skills.length > 0 ? (
          <Skills skills={skills} />
        ) : (
          <div className="mt-24 flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-muted">
              <Cog />
            </div>
            <h4 className="text-xl font-semibold">No skills yet</h4>
            <p className="text-muted-foreground text-center">
              You haven&apos;t added any skills yet. Get started by adding your
              first skill.
            </p>
            <Button asChild className="mb-4" title="Add Skill">
              <Link href="/admin/skills/add">
                <Plus className="mr-2" />
                Add Skill
              </Link>
            </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value="about" className="w-full">
        <AboutTab about={about} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
