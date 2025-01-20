// app/share/[[...slug]]/page.tsx
import type { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export function generateMetadata({ params }: Props): Metadata {
  if (!params.slug) return { title: "Share Image" };

  const imageUrl = decodeURIComponent("https://" + params.slug.join("/"));

  return {
    metadataBase: new URL("https://jeefx-twitter-test.vercel.app"),
    title: "Image hosted at ImgBB",
    description: "Image hosted in ImgBB",
    openGraph: {
      type: "article",
      url: imageUrl,
      title: "Image hosted at ImgBB",
      siteName: "ImgBB",
      description: "Image hosted in ImgBB",
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Image hosted at ImgBB",
      description: "Image hosted in ImgBB",
      images: imageUrl, // Use the direct image URL
    },
  };
}

export default function SharePage({ params }: Props) {
  if (!params.slug) {
    return <div>No image URL provided</div>;
  }

  const imageUrl = decodeURIComponent("https://" + params.slug.join("/"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Shared Image</h1>
        <div className="relative w-full aspect-video">
          <img
            src={imageUrl}
            alt="Shared content"
            className="rounded-lg w-full h-full object-contain"
          />
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-sm font-mono break-all">Image URL: {imageUrl}</p>
        </div>
      </div>
    </div>
  );
}
