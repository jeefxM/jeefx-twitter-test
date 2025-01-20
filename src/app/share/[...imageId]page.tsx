// app/share/[...imageId]/page.tsx
import type { Metadata } from "next";

type Props = {
  params: { imageId: string[] };
};

export function generateMetadata({ params }: Props): Metadata {
  // Join all parts of the URL back together and add https:// back
  const fullImageUrl = "https://" + params.imageId.join("/");
  const imageUrl = decodeURIComponent(fullImageUrl);

  return {
    metadataBase: new URL("https://jeefx-twitter-test.vercel.app"),
    title: "Image Share App",
    description: "Share your images on Twitter",
    twitter: {
      card: "summary_large_image",
      title: "Image Share App",
      description: "Share your images on Twitter",
      //@ts-ignore
      image: imageUrl, // Changed from images array to single image
    },
    openGraph: {
      title: "Image Share App",
      description: "Share your images on Twitter",
      images: [imageUrl],
    },
  };
}

export default function SharePage({ params }: Props) {
  const fullImageUrl = "https://" + params.imageId.join("/");
  const imageUrl = decodeURIComponent(fullImageUrl);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl mb-8">Shared Image</h1>
      <img
        src={imageUrl}
        alt="Shared content"
        className="max-w-2xl rounded-lg shadow-lg"
      />
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm font-mono break-all">Image URL: {imageUrl}</p>
      </div>
    </div>
  );
}
