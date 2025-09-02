// Directives
"use client";

// Packages imports
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Local types
type PropsType = {
  path: string;
  delay?: number;
};

export default function RedirectClient({ path, delay = 2000 }: PropsType) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(path);
    }, delay);

    return () => clearTimeout(timer);
  }, [path, delay]);

  return <div className="w-full text-center text-2xl">Redirecting...</div>; // Optional spinner or message
}
