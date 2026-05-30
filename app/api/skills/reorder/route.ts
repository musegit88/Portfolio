import { projects } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skills } = await request.json();
    if (!Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "Invalid payload: expected non-empty skills array" },
        { status: 400 },
      );
    }
    //   Run all order updates in a single transaction
    await prisma.$transaction(
      skills.map(({ id, order }: { id: string; order: number }) =>
        prisma.skill.update({
          where: { id },
          data: { order },
        }),
      ),
    );
    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Failed to reorder skills:", error);
    return NextResponse.json(
      { error: "Failed to reorder skills" },
      { status: 500 },
    );
  }
}
