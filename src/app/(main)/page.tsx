"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url:string) => {
      if (url !== "/welcome") {
        router.push("/welcome");
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
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <Link
        href={"/welcome"}
        replace={true}
        className="w-full h-full flex items-center justify-center"
      >
        <div
          className={`transition-transform duration-300 ${
            hovered ? "scale-110" : ""
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src="/invited.png"
            width={1000}
            height={1000}
            alt="Picture of the author"
          />
        </div>
      </Link>
    </div>
  );
}
