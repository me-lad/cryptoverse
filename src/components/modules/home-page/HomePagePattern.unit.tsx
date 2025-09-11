// Directives
"use client";
import "client-only";

// Packages imports
import Image from "next/image";

// Local imports
import { useScreenWidth } from "@/lib/hooks/useScreenWidth";

// Functional component
export default function HomePagePatternUnit() {
  const screenWidth = useScreenWidth();

  return (
    <div className="absolute top-0 right-0 left-0 -z-[1] flex w-full justify-center opacity-60 select-none">
      <Image
        src="/svgs/home-page/home-pattern.svg"
        alt="Home page"
        width={screenWidth || 1500}
        height={1000}
        className="h-auto max-w-full"
      />
    </div>
  );
}
