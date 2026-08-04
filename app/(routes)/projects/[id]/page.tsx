import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Footer from "@/components/footer";
import ProjectDetailView, { ShowcaseProject } from "@/components/project-detail-view";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProjectData(id: string): Promise<{
  project: ShowcaseProject;
  nextProject: ShowcaseProject | null;
  prevProject: ShowcaseProject | null;
} | null> {
  let dbProjects: any[] = [];
  try {
    dbProjects = await prisma.project.findMany({
      where: { archived: false },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.warn("Could not fetch projects from DB:", error);
    return null;
  }

  if (!dbProjects || dbProjects.length === 0) {
    return null;
  }

  const allProjects: ShowcaseProject[] = dbProjects.map((dbProj) => ({
    id: String(dbProj.id),
    title: dbProj.title,
    description: dbProj.description,
    fullDescription:
      dbProj.fullDescription ||
      dbProj.description,
    imageUrl: dbProj.imageUrl,
    demoUrl: dbProj.demoUrl,
    githubUrl: dbProj.githubUrl,
    technologies: dbProj.technologies || [],
    featured: dbProj.featured,
    order: dbProj.order,
    archived: dbProj.archived,
    category: dbProj.category,
    role: dbProj.role,
    duration: dbProj.duration,
    status: dbProj.status,
    metrics: dbProj.metrics,
    features: dbProj.features,
    challenges: dbProj.challenges,
    techCategories: dbProj.techCategories || [
      {
        category: "Technologies & Frameworks",
        items: dbProj.technologies,
      },
    ],
  }));

  const currentIndex = allProjects.findIndex(
    (p) => String(p.id) === String(id)
  );

  if (currentIndex === -1) {
    return null;
  }

  const project = allProjects[currentIndex];
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return { project, prevProject, nextProject };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getProjectData(resolvedParams.id);
  if (!data) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${data.project.title} | Project Showcase`,
    description: data.project.description,
    openGraph: {
      title: data.project.title,
      description: data.project.description,
      images: [
        {
          url: data.project.imageUrl || "",
          alt: data.project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getProjectData(resolvedParams.id);

  if (!data) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <ProjectDetailView
        project={data.project}
        prevProject={data.prevProject}
        nextProject={data.nextProject}
        user={user}
      />
      <Footer />
    </>
  );
}
