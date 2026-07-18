import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/auth";

// Get settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const settings = await prisma.setting.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

// Update settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const {
      id,
      showGoogleAnalytics,
      themePreference,
      logoUrl,
      faviconUrl,
      siteTitle,
      siteDescription,
      defaultOgImage,
      contactEmail,
      resumeUrl,
    } = body;

    // Update settings
    const settings = await prisma.setting.update({
      where: {
        id,
      },
      data: {
        showGoogleAnalytics,
        themePreference,
        logoUrl,
        faviconUrl,
        siteTitle,
        siteDescription,
        defaultOgImage,
        contactEmail,
        resumeUrl,
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
