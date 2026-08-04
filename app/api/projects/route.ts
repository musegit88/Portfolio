// Get all projects

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// create project (protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const {
      title,
      description,
      fullDescription,
      imageUrl,
      demoUrl,
      githubUrl,
      technologies,
      featured,
      order,
      category,
      role,
      duration,
      status,
      features,
      metrics,
      challenges,
      techCategories,
    } = body;

    //    validate required fields
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get the highest order number and increment by 1
    // This automatically places new projects at the end
    const maxOrder = await prisma.project.aggregate({
      _max: {
        order: true,
      },
    });

    const nextOrder = (maxOrder._max.order || 0) + 1;

    // create new project with auto-incremented order
    const project = await prisma.project.create({
      data: {
        title,
        description,
        ...(fullDescription && { fullDescription }),
        imageUrl,
        demoUrl,
        githubUrl,
        technologies,
        featured,
        // order is set to nextOrder to automatically place new projects at the end
        order: nextOrder,
        ...(category && { category }),
        ...(role && { role }),
        ...(duration && { duration }),
        ...(status && { status }),
        ...(features && { features }),
        ...(metrics && { metrics }),
        ...(challenges && { challenges }),
        ...(techCategories && { techCategories }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
