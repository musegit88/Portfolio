import { authOptions } from "@/auth";
import { getSupabaseClient } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Upload logo(protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // limit file size to 2MB
    const max_file_size = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > max_file_size) {
      return NextResponse.json(
        { error: "File size exceeds 2MB limit" },
        { status: 400 },
      );
    }

    // validate file type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPG, PNG, WEBP, and SVG are allowed.",
        },
        { status: 400 },
      );
    }

    // generate unique file name using timestamp and random string
    const fileExt = file.name.split(".").pop();
    const fileName = `logo-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // upload file to supabase storage
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.storage
      .from("site-logos")
      .upload(`public/${fileName}`, file);
    if (error) {
      return NextResponse.json({ error: error.message });
    }
    // get public url of uploaded file
    const { data: url } = supabase.storage
      .from("site-logos")
      .getPublicUrl(`public/${fileName}`);
    return NextResponse.json({ logoUrl: url.publicUrl });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
