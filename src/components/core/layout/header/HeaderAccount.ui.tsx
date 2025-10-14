// 📦 Third-Party imports
import { Button } from '@/components/core/ui/shadcn/button';
import { BellDot, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  isAuthenticated: boolean;
}

// ⚙️ Functional component
export default function HeaderAccountUi({ isAuthenticated }: PropsT) {
  return (
    <>
      {isAuthenticated ? (
        // Dashboard button
        <div className={`${flexCenter} gap-6`}>
          {/* Notifications */}
          <div className="hover:cursor-pointer">
            <BellDot size={22} />
          </div>

          {/* Account center */}
          <div className="hover:cursor-pointer">
            <User />
          </div>
          {/* <div className={`${flexCenter} h-[60px] w-[60px] rounded-full bg-neutral-900`}>
            <div className="relative h-5/6 w-5/6 rounded-full">
              <Image src={"/images/dashboard/avatar.png"} fill alt="Profile image" />
            </div>
          </div> */}
        </div>
      ) : (
        // Signin/Signup
        <Button
          variant="default"
          size="default"
          className="px-8 text-white *:transition-all *:hover:-translate-y-0.5"
        >
          <Link href={'/auth/signup'}>Signup</Link>/
          <Link href={'/auth/signin'}>Signin</Link>
        </Button>
      )}
    </>
  );
}
