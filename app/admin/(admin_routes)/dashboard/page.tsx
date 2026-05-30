import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

import DashboardTabs from "../_components/dashboard-tabs";

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
      order: "asc",
    },
  });
  const skills = await prisma.skill.findMany({
    orderBy: {
      order: "asc",
    },
  });
  const about = await prisma.about.findFirst();
  return (
    <div className="h-screen">
      <div className="mt-4">
        <DashboardTabs
          projectsCount={projectsCount}
          featuredProjectsCount={featuredProjectsCount}
          skillsCount={skillsCount}
          projects={projects}
          skills={skills}
          about={about}
        />
      </div>
    </div>
  );
};

export default Dashboard;
