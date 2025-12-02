// 📌 Directives

// 📦 Third-Party imports
import { PenSquare } from 'lucide-react';
import Link from 'next/link';

// 📦 Internal imports
import FluidContainer from '../../FluidContainer';
import { flexBetween } from '~styles/tw-custom';

// ⚙️ Functional component
const UserData = async () => {
  return (
    <FluidContainer className="mt-5" condense_title="Account Information">
      <div className={`${flexBetween}`}>
        <h2 className="text-xl font-semibold">Mohammad Mahdi Esmaeli</h2>
        <Link
          href={'/dashboard/account-management'}
          className="flex min-w-8 justify-end"
        >
          <PenSquare size={18} className="mt-1" />
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-14 gap-y-7">
        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Username</p>
          <p>MiladEsm</p>
        </div>

        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Phone Number</p>
          <p>
            0910 <small className="text-xs">****</small> 911
          </p>
        </div>

        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Email Address</p>
          <p>MiladEsm@gmail.com</p>
        </div>

        <div className="hidden flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70 xl:flex">
          <p>Last Login</p>
          <p>
            2024-08-29 | 19:32:12 | ( 192.
            <small className="text-xs">***</small>
            .87 )
          </p>
        </div>
      </div>
    </FluidContainer>
  );
};
export default UserData;
