// app/share/[...imageId]/page.tsx
import type { Metadata } from "next";

type Props = {
  params: { imageId: string[] };
};

export function generateMetadata({ params }: Props): Metadata {
  const fullImageUrl = "https://" + params.imageId.join("/");
  const imageUrl = decodeURIComponent(fullImageUrl);

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
          width: 731,
          height: 623,
        },
      ],
    },
    //@ts-ignore
    twitter: {
      card: "photo",
      title: "Image hosted at ImgBB",
      description: "Image hosted in ImgBB",
      site: "@imgbb_com",
    },
    alternates: {
      types: {
        "application/json+oembed": `${imageUrl}/oembed.json`,
        "application/xml+oembed": `${imageUrl}/oembed.xml`,
      },
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
