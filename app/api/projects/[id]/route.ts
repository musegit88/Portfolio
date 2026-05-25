import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

// Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 },
    );
  }
}

// Update project (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await request.json();

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: body,
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// Delete project (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  const session = getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    // get project image url
    const projectImageUrl = await prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        imageUrl: true,
      },
    });
    // extract file name from url
    const fileName = projectImageUrl?.imageUrl.split("/").pop();

    // delete project from database
    await prisma.project.delete({
      where: { id },
    });

    // delete project image from storage
    const { error } = await supabase.storage
      .from("project-images")
      .remove([`public/${fileName}`]);
    if (error) {
      return NextResponse.json({ error: "Failed to delete project image" });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
