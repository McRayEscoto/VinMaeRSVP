import Link from "next/link";
import RSVP from "@/app/rsvp/page";

export default function TopBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/rsvp">RSVP</Link>
    </nav>
  );
}
