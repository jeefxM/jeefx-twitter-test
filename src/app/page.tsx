"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function Home() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setImageUrl(data.url);
    } catch (err) {
      //@ts-ignore
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleShare = () => {
    if (!imageUrl) return;

    // Remove https:// when adding to path
    const urlWithoutProtocol = imageUrl.replace("https://", "");
    const shareUrl = `https://jeefx-twitter-test.vercel.app/share/${urlWithoutProtocol}`;
    const tweetText = "Check out this image!";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(shareUrl)}`;

    window.open(tweetUrl, "_blank");
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Share Image on Twitter
        </h1>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              {uploading ? "Uploading..." : "Click to upload an image"}
            </span>
          </label>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        {imageUrl && (
          <div className="space-y-4">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="w-full rounded-lg"
            />
            <button
              onClick={handleShare}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Share on Twitter
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
