import { put } from "@vercel/edge-config";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to base64 for edge storage
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;

    // Store in edge config
    await put(filename, base64);

    // Return the URL that will be used to access the image
    const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/images/${filename}`;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
