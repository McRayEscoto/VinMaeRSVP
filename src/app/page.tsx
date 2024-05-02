import Link from "next/link";
import Image from "next/image";

export default function Home() {
   return (
      <main className="h-dvh w-dvw absolute left-0 top-0 p-4 bg-white flex flex-col items-center justify-center">
         <Link href="/main" className="p-2 bg-color-main text-white rounded font-bold ribbon hover:bg-[#445841] transition-all text-2xl w-fit text-center">
            Click for a surprise!
         </Link>
      </main>
   );
}
