import Link from "next/link";
import { getServerSession } from "next-auth";
import { Cog, FolderPlus, Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { navTabs } from "@/lib/constants";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Overview from "../_components/overview";
import Projects from "../_components/projects";
import Skills from "../_components/skills";
import AboutTab from "../_components/about";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) return;

  const projectsCount = await prisma.project.count();
  const featuredProjectsCount = await prisma.project.count({
    where: {
      featured: true,
    },
  });
  const skillsCount = await prisma.skill.count();
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const skills = await prisma.skill.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const about = await prisma.about.findFirst();
  return (
    <div className="h-screen">
      <div className="mt-4">
        <Tabs
          defaultValue="overview"
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
                  You haven&apos;t added any skills yet. Get started by adding
                  your first skill.
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
      </div>
    </div>
  );
};

export default Dashboard;
