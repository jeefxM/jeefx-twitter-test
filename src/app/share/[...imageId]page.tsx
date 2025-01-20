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
      //@ts-ignore
      image:
        "https://files.edgestore.dev/rbc73bkph9j8n3nl/publicFiles/_public/5147ae3e-97f2-471a-8407-6876105dbdc2.png",
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
