import Link from "next/link";
import RSVP from "@/app/rsvp/page";

export default function TopBar() {
  return (
    <nav>
      
      <Link href="/">SAVE THE DATE</Link>
      <Link href="/rsvp">RSVP</Link>
      <Link href="/themes">THEMES</Link>
      <Link href="/gallery">GALLERY</Link>
    </nav>
  );
}
