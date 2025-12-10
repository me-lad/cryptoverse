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
  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger>
        <User className="hover:cursor-pointer" />
      </DropDownTrigger>

      <DropDownMenu className="mt-7 w-80 p-5 max-[37.5em]:-left-32 max-[22.5em]:fixed max-[22.5em]:top-10 max-[22.5em]:right-0 max-[22.5em]:left-0 max-[22.5em]:mx-auto max-[22.5em]:w-[19rem] max-[22.5em]:translate-x-0 lg:-left-28 xl:-left-20 2xl:left-1/2">
        <div className="flex items-center gap-4 border-b pb-5">
          <div
            className={`${flexCenter} bg-primary/25 h-[50px] w-[50px] rounded-full`}
          >
            <div className="relative h-11/12 w-11/12 rounded-full">
              <Image
                src={'/images/dashboard/avatar.png'}
                fill
                alt="Profile image"
              />
            </div>
          </div>
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
          <Link href={'/dashboard/account-management'}>
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
