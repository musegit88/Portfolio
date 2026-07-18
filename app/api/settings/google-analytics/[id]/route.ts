import { prisma } from "@/lib/prisma";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const { id: settingsId, showGoogleAnalytics } = body;
    await prisma.setting.update({
      where: {
        id: settingsId,
        userId: id,
      },
      data: { showGoogleAnalytics },
    });
    return NextResponse.json({
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating settings", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
