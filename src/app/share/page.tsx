// app/share/page.tsx
import type { Metadata } from "next";

// Correctly type the props according to Next.js 14
interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  const imageUrl = searchParams.url as string;

  return {
    title: "Image Share App",
    description: "Share your images on Twitter",
    openGraph: {
      title: "Image Share App",
      description: "Share your images on Twitter",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: "Image Share App",
      description: "Share your images on Twitter",
      images: imageUrl,
    },
  };
}

export default function SharePage({ searchParams }: any) {
  const imageUrl = searchParams.url as string;

  if (!imageUrl) {
    return <div>No image URL provided</div>;
  }

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
