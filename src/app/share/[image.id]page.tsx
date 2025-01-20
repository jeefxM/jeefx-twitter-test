// app/share/[imageId]/page.tsx
import { Metadata } from "next";

interface Props {
  params: { imageId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { imageId } = params;
  const imageUrl = decodeURIComponent(imageId);

  return {
    title: "Shared Image",
    description: "Check out this awesome image!",
    metadataBase: new URL("https://jeefx-twitter-test.vercel.app"),
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

export default function SharePage({ params }: Props) {
  const imageUrl = decodeURIComponent(params.imageId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl mb-8">Shared Image</h1>
      <img
        src={imageUrl}
        alt="Shared content"
        className="max-w-2xl rounded-lg shadow-lg"
      />
    </div>
  );
}
