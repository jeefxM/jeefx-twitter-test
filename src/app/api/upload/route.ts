import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("file") as File;

    if (!image) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // Create form data for imgbb
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", base64Image);

    // Upload to imgbb
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imgbbFormData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return NextResponse.json({
      success: true,
      url: data.data.url,
      delete_url: data.data.delete_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
