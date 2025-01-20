import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "./lib/edgestore";

export const metadata: Metadata = {
  title: "Image Share App",
  description: "Share your images on Twitter",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
