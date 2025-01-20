import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { filename } = params;
    const base64Image = await get(filename);

    if (!base64Image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convert base64 back to buffer
    const buffer = Buffer.from(base64Image, "base64");

    // Determine content type from filename
    const contentType = filename.toLowerCase().endsWith(".png")
      ? "image/png"
      : "image/jpeg";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
