import Link from "next/link";
import { Cormorant } from "next/font/google";

const cormorant = Cormorant({ subsets: ["latin"] });

export default function TopBar() {
   return (
      <nav
         className={`${cormorant.className} w-dvw font-black bg-color-secondary text-white flex justify-between px-4 py-2 sm:justify-evenly`}
      >
         <Link
            href="/welcome"
            className="rounded transition-all p-1 hover:bg-color-main/50"
         >
            Save the Date!
         </Link>
         <Link
            href="/rsvp"
            className="rounded transition-all p-1 hover:bg-color-main/50"
         >
            RSVP
         </Link>
         <Link
            href="/theme"
            className="rounded transition-all p-1 hover:bg-color-main/50"
         >
            Theme/Attire
         </Link>
         <Link
            href="/gallery"
            className="rounded transition-all p-1 hover:bg-color-main/50"
         >
            Gallery
         </Link>
      </nav>
   );
}
