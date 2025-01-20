// app/share/[imageId]/page.tsx
import { Metadata } from "next";

interface Props {
  params: { imageId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imageUrl = decodeURIComponent(params.imageId);

  return {
    title: "Shared Image",
    description: "Check out this awesome image!",
    openGraph: {
      title: "Shared Image",
      description: "Check out this awesome image!",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shared Image",
      description: "Check out this awesome image!",
      images: [imageUrl],
    },
  };
}

export default function SharePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Loading image...</h1>
    </div>
  );
}
