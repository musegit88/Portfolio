import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// PATCH /api/projects/reorder
// Body: { projects: { id: string; order: number }[] }
export async function PATCH(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projects } = await request.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      return NextResponse.json(
        { error: "Invalid payload: expected non-empty projects array" },
        { status: 400 },
      );
    }

    // Run all order updates in a single transaction
    await prisma.$transaction(
      projects.map(({ id, order }: { id: string; order: number }) =>
        prisma.project.update({
          where: { id },
          data: { order },
        }),
      ),
    );

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Failed to reorder projects:", error);
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 },
    );
  }
}
