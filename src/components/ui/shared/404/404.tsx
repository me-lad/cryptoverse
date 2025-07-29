// Directives

// Packages imports
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

// Local imports
import { flexCenter, posCenter } from "@/lib/styles/tw-custom";
import { Button } from "../../shadcn/button";

// Local types

// Functional component
export default function The_404() {
  return (
    <div className="w-full h-full relative">
      <div className={clsx(posCenter, "flex flex-col items-center w-1/3 h-fit")}>
        <div>
          <Image src={"/images/404.png"} alt="Not Found" width={513} height={180} />
        </div>
        <div>
          <h2 className="text-white font-semibold text-4xl mt-8">Sorry, page not found !</h2>
        </div>
        <div>
          <p className="text-center text-gray-400 tracking-wide text-lg font-medium leading-snug mt-4">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL. Be sure to
            check your spelling.
          </p>
        </div>
        <div className="mt-12">
          <Button variant="default" className="text-white" size="lg">
            <Link className={clsx(flexCenter, "w-full h-full")} href={"/"}>
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
