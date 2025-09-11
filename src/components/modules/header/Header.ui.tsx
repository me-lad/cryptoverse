// Packages imports
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

// Local imports
import { flexBetween } from "@/lib/shared/tw-custom";
import HeaderSearchFn from "./HeaderSearch.fn";
import HeaderAccountFn from "./HeaderAccount.fn";

// Functional component
export default function HeaderUi() {
  return (
    <header className={clsx(flexBetween, "pt-8")}>
      {/* Logo & Navbar */}
      <div className="flex items-center gap-8">
        {/* Logo-Text */}
        <div>
          <Link href={"/"}>
            <Image
              src="/svgs/logo/logo-text.svg"
              alt="Coin Verse"
              width={204}
              height={43}
            />
          </Link>
        </div>
        {/* Navbar */}
        <div>
          <nav>
            <ul className="flex items-center gap-8 pt-1">
              {["markets", "support", "blog"].map((item, index) => (
                <li className="text-lg text-neutral-300" key={index}>
                  <Link href={`/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Search & Account center */}
      <div className="flex items-center gap-6">
        {/* Search button & Search modal */}
        <HeaderSearchFn />

        {/* Account center */}
        <HeaderAccountFn />
      </div>
    </header>
  );
}
