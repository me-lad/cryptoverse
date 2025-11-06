// 📌 Directives

// 📦 Third-Party imports
import { PenSquare } from 'lucide-react';
import Link from 'next/link';

// 📦 Internal imports
import FluidContainer from '../../FluidContainer';

// ⚙️ Functional component
const UserData = async () => {
  return (
    <FluidContainer className="mt-5" condense_title="Account Information">
      <h2 className="text-xl font-semibold">Mohammad Mahdi Esmaeli</h2>

      <div className="mt-5 flex items-center gap-14">
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
          <p>MiladEsmaeili@gmail.com</p>
        </div>

        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Last Login</p>
          <p>
            2024-08-29 | 19:32:12 | ( 192.
            <small className="text-xs">***</small>
            .87 )
          </p>
        </div>
      </div>

      <div className="absolute top-5 right-5">
        <Link href={'/dashboard/account-management'}>
          <PenSquare size={18} />
        </Link>
      </div>
    </FluidContainer>
  );
};
export default UserData;
