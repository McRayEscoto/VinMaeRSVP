"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import { Cormorant } from "next/font/google";

const halimun = localFont({ src: "/Halimun.ttf" });
const cormorant = Cormorant({ subsets: ["latin"] });

export default function Home() {
   const router = useRouter();

   useEffect(() => {
      const handleRouteChange = (url: string) => {
         if (url !== "/rsvp") {
            router.push("/rsvp");
         }
      };

      const beforePopStateHandler = () => {
         handleRouteChange(window.location.pathname);
         return false;
      };

      window.addEventListener("popstate", beforePopStateHandler);

      return () => {
         window.removeEventListener("popstate", beforePopStateHandler);
      };
   }, [router]);

   return (
      <div className="flex flex-col items-center justify-center px-4 size-full">
         <Link
            href="/rsvp"
            replace={true}
            className={`size-full flex flex-col items-center justify-center text-center`}
         >
            <span
               className={`${halimun.className} leading-normal text-6xl transition-all hover:scale-105 md:text-6xl`}
            >
               You&apos;re Invited!
            </span>
            <span
               className={`${cormorant.className} font-black opacity-50 absolute bottom-40`}
            >
               Tap anywhere to continue
            </span>
         </Link>
      </div>
   );
}
