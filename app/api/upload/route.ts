import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Upload image(protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // generate unique file name using timestamp and random string
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // upload file to supabase storage
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(`public/${fileName}`, file);
    if (error) {
      return NextResponse.json({ error: error.message });
    }
    // get public url of uploaded file
    const { data: url } = supabase.storage
      .from("project-images")
      .getPublicUrl(`public/${fileName}`);

    return NextResponse.json({ imageUrl: url.publicUrl });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
