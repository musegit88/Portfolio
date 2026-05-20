import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../_components/header";
import Overview from "../_components/overview";
import Projects from "../_components/projects";
import Skills from "../_components/skills";
import AboutTab from "../_components/about";
import { navTabs } from "@/lib/constants";

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
      <Header session={session} />
      <div className="mt-4 container">
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
            <Projects projects={projects} />
          </TabsContent>
          <TabsContent value="skills">
            <Skills skills={skills} />
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
