import Link from "next/link";

export default function TopBar() {
   return (
      <nav className="w-dvw h-14 bg-color-main px-4 py-2 flex items-center gap-20 justify-center">
         <Link href="/">Save the Date!</Link>
         <Link href="/rsvp">RSVP</Link>
         <Link href="/theme">Theme/Attire</Link>
         <Link href="/gallery">Gallery</Link>
      </nav>
   );
}
