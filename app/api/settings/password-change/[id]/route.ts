import { prisma } from "@/lib/prisma";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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
    const { currentPassword, newPassword, confirmNewPassword } = body;

    // if the new password and confirm new password are not the same, return error
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        {
          error:
            "Passwords do not match, Please enter the same password in new password and confirm new password fields",
        },
        { status: 401 },
      );
    }

    // find the admin user's password in the database
    const adminPassword = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    // compare current password with the hashed password in the database
    const comparePassword = await bcrypt.compare(
      currentPassword,
      adminPassword?.password as string,
    );

    if (!comparePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: "password updated successfully",
    });
  } catch (error) {
    console.error("Error updating Google Analytics", error);
    return NextResponse.json(
      { error: "Failed to update Google Analytics" },
      { status: 500 },
    );
  }
}
