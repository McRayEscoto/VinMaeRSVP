import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Philip+Jane Wedding",
   description: "We would like to invite you!",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body id="main_body" className="w-dvw h-dvh">
            {children}
         </body>
      </html>
   );
}
