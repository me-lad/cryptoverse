// Directives

// Packages imports
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";

// Local imports

// Local types

// Functional component
export default function HeaderAccountUi() {
  return (
    <div>
      {true ? (
        // Signin/Signup
        <Button
          variant="default"
          size="default"
          className="px-8 text-white *:transition-all *:hover:underline"
        >
          <Link href={"/auth/signup"}>Signup</Link>/
          <Link href={"/auth/signin"}>Signin</Link>
        </Button>
      ) : (
        // Dashboard button
        <></>
      )}
    </div>
  );
}
