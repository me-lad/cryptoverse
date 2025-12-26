// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import {
  CircleUser,
  LogOut,
  MailPlus,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import type { HeaderReceivableUserDataT } from '~types/dto/user';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// 🧾 Local types
interface PropsT {
  signoutHandler: () => void;
  userData?: HeaderReceivableUserDataT;
}

// ⚙️ Functional component
const Profile: React.FC<PropsT> = ({ userData, signoutHandler }) => {
  const src = userData?.profileImage
    ? userData.profileImage
    : '/images/dashboard/avatar.png';

  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger>
        <User className="hover:cursor-pointer" />
      </DropDownTrigger>

      <DropDownMenu className="mt-7 w-80 p-5 max-[37.5em]:-left-32 max-[22.5em]:fixed max-[22.5em]:top-10 max-[22.5em]:right-0 max-[22.5em]:left-0 max-[22.5em]:mx-auto max-[22.5em]:w-[19rem] max-[22.5em]:translate-x-0 lg:-left-28 xl:-left-20 2xl:left-1/2">
        <div className="flex items-center gap-4 border-b pb-5">
          {userData?.profileImage ? (
            <div
              className={`${flexCenter} bg-primary/25 h-[50px] w-[50px] rounded-full`}
            >
              <div className="relative h-11/12 w-11/12 rounded-full">
                <Image
                  className="rounded-full object-cover"
                  src={src}
                  fill
                  alt="Profile image"
                />
              </div>
            </div>
          ) : (
            <div
              className={`${flexCenter} border-foreground h-10 w-10 rounded-full border p-1`}
            >
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"></path>
                </g>
              </svg>
            </div>
          )}
          <div>
            <h2 className="font-semibold">{userData?.username}</h2>
            <p className="mt-1 text-xs opacity-80">
              {userData?.phoneNumber.slice(0, 4)}
              <small className="mx-1">****</small>
              {userData?.phoneNumber.slice(8)}
            </p>
          </div>
        </div>
        <div className="*:hover:*:text-primary-400 border-b py-5 *:*:transition-all">
          <Link href={'/dashboard'}>
            <Button
              variant={'ghost'}
              size={'lg'}
              className="w-full cursor-pointer justify-start !bg-transparent"
            >
              <CircleUser />
              Dashboard
            </Button>
          </Link>
          <Link href={'/dashboard/account-management/personal-information'}>
            <Button
              variant={'ghost'}
              size={'lg'}
              className="w-full cursor-pointer justify-start !bg-transparent"
            >
              <Settings />
              Manage Account
            </Button>
          </Link>
          <Link href={'/dashboard/kyc'}>
            <Button
              variant={'ghost'}
              size={'lg'}
              className="w-full cursor-pointer justify-start !bg-transparent"
            >
              <ShieldCheck />
              KYC Verification
            </Button>
          </Link>
          <Link href={'/dashboard/support'}>
            <Button
              variant={'ghost'}
              size={'lg'}
              className="w-full cursor-pointer justify-start !bg-transparent"
            >
              <MailPlus />
              Ticketing
            </Button>
          </Link>
        </div>
        <div className="pt-5">
          <Button
            variant={'outline'}
            className="w-full cursor-pointer rounded-sm"
            onClick={signoutHandler}
          >
            <LogOut />
            Sign out
          </Button>
        </div>
        <div></div>
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default Profile;
