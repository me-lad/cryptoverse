// Packages imports
import { Button } from "@/components/ui/shadcn/button";
import { BellDot } from "lucide-react";
import Link from "next/link";

// Local imports
import { flexCenter } from "@/lib/shared/tw-custom";
import Image from "next/image";

// Local types
interface PropsType {
  isAuthenticated: boolean;
}

// Functional component
export default function HeaderAccountUi({ isAuthenticated }: PropsType) {
  return (
    <>
      {isAuthenticated ? (
        // Dashboard button
        <div className={`${flexCenter} gap-6`}>
          <div className="hover:cursor-pointer">
            <BellDot size={22} />
          </div>
          <div className={`${flexCenter} h-[60px] w-[60px] rounded-full bg-neutral-900`}>
            <div className="relative h-5/6 w-5/6 rounded-full">
              <Image src={"/images/dashboard/avatar.png"} fill alt="Profile image" />
            </div>
          </div>
        </div>
      ) : (
        // Signin/Signup
        <Button
          variant="default"
          size="default"
          className="px-8 text-white *:transition-all *:hover:underline"
        >
          <Link href={"/auth/signup"}>Signup</Link>/<Link href={"/auth/signin"}>Signin</Link>
        </Button>
      )}
    </>
  );
}
