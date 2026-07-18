import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

// Update skill (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  try {
    const body = await request.json();

    await prisma.skill.update({
      where: {
        id,
      },
      data: body,
    });
    return NextResponse.json("Skill updated successfully");
  } catch (error) {
    console.error("Failed to update skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 },
    );
  }
}

// Delete skill (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  try {
    await prisma.skill.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
