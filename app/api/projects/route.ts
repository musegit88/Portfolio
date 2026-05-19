// Get all projects

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
  const session = await getServerSession();
  try {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const {
      title,
      description,
      imageUrl,
      demoUrl,
      githubUrl,
      technologies,
      featured,
      order,
    } = body;

    //    validate required fields
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // create new project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        demoUrl,
        githubUrl,
        technologies,
        featured,
        order,
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
