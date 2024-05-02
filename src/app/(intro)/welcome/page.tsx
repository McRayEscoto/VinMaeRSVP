import Link from "next/link";
import Image from "next/image";
import invited from "@/assets/invited.png"

export default function Home() {
  return (
    <Link
      href="/"
      className="w-full h-full flex justify-center items-center flex-col gap-14"
    >
      <Image
        src={invited} // Replace with the actual path to your image
        alt="Image Description" // Provide an appropriate alt text
        width={1000} // Specify the desired width (adjust as needed)
        height={1000} // Specify the desired height (adjust as needed)
      />
    </Link>
  );
}