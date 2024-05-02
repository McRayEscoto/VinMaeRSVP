import type { Metadata } from "next";
import "../globals.css";
import TopBar from "@/components/TopBar";
import backgroundTexture from "@/assets/bg-texture.png"; // Import the texture image


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full h-dvh`}
        style={{ backgroundImage: `url(${backgroundTexture.src})` }}
      >
        <TopBar />
        {children}
      </body>
    </html>
  );
}
