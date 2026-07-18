import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Get about
export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    console.error("Failed to fetch about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about" },
      { status: 500 },
    );
  }
}

// Update about (protected)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const about = await prisma.about.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return NextResponse.json(about);
  } catch (error) {
    console.error("Failed to update about:", error);
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 },
    );
  }
}
