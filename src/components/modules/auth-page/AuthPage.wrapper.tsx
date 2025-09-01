// Packages imports
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";

// Local imports
import { flexCenter } from "@/lib/shared/tw-custom";
import { Button } from "@/components/ui/shadcn/button";
import AuthPagePatternUnit from "./AuthPagePattern.unit";

// Local types
type PropsType = {
  iconPath: string;
  subtitleText: string;
  backButtonVisibility?: boolean;
  backButtonPath?: string;
  children: React.ReactNode;
};

// Functional component
export default function AuthPageView({
  iconPath,
  subtitleText,
  backButtonVisibility,
  backButtonPath,
  children,
}: PropsType) {
  return (
    <>
      {/* Page pattern */}
      <AuthPagePatternUnit />

      {/* Page content */}
      <div className={clsx("relative z-[2] h-screen w-full", flexCenter)}>
        <div className="border-t-primary h-fit w-fit max-w-4/6 overflow-x-hidden rounded-md border border-t-2 border-neutral-800 bg-[rgba(0,0,0,0.15)] px-36 py-12 backdrop-brightness-105">
          {/* Form heading */}
          <div>
            {/* Icon */}
            <div className={clsx("gap-4 select-none", flexCenter)}>
              <Image
                src="/svgs/auth-page/auth-pattern-form-left.svg"
                alt={"Auth page"}
                width={98}
                height={36}
              />
              <Image src={iconPath} alt={subtitleText} width={80} height={50} />
              <Image
                src="/svgs/auth-page/auth-pattern-form-right.svg"
                alt={subtitleText}
                width={98}
                height={36}
              />
            </div>

            {/* Title */}
            <h2
              className={clsx(
                "mt-8 flex gap-2 text-3xl font-bold text-white",
                flexCenter,
              )}
            >
              Welcome to
              <Link href={"/"} className="text-primary">
                CryptoVerse
              </Link>
            </h2>

            {/* Subtitle */}
            <p
              id="form-wrapper-subtitle"
              className="mt-2 text-center text-lg font-light tracking-wide text-neutral-400"
            >
              {subtitleText}
            </p>
          </div>

          {/* Form back button */}
          {backButtonVisibility && (
            <div className="absolute top-4 left-4">
              <Button variant="outline" size="default">
                <Link className="flex" href={backButtonPath || "/"}>
                  <ChevronLeft />
                  <span>Back</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Form content */}
          {children}
        </div>
      </div>
    </>
  );
}
