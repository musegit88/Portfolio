import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Get all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

// Create skill (protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, level, icon, order } = body;

    // validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // create new skill
    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        level,
        icon,
        order,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}
