// 📦 Third-Party imports
import { PenSquare } from 'lucide-react';
import Link from 'next/link';

// 📦 Internal imports
import FluidContainer from '../../FluidContainer';
import { flexBetween } from '~styles/tw-custom';
import { UserServices } from '~services/repositories/user';
import { AuthServices } from '~services/repositories/auth';

// ⚙️ Functional component
const UserData = async () => {
  const { username: accessIdentifier } =
    await AuthServices.verifyAccessSession();
  const { username: refreshIdentifier } =
    await AuthServices.verifyAccessSession();
  const userData = await UserServices.getUserDataByIdentifier(
    accessIdentifier || refreshIdentifier || '',
    'phoneNumber username createdAt email',
  );

  if (!userData) return null;

  return (
    <FluidContainer className="mt-5" condense_title="Account Information">
      <div className={`${flexBetween}`}>
        <h2 className="text-xl font-semibold">{userData.username}</h2>
        <Link
          href={'/dashboard/account-management/personal-information'}
          className="flex min-w-8 justify-end"
        >
          <PenSquare size={18} className="mt-1" />
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-14 gap-y-7">
        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Username</p>
          <p>{userData?.username}</p>
        </div>

        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Phone Number</p>
          <p>
            {userData?.phoneNumber.slice(0, 4)}{' '}
            <small className="text-xs">****</small>{' '}
            {userData?.phoneNumber.slice(8)}
          </p>
        </div>

        <div className="flex flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70">
          <p>Email Address</p>
          <p className="text-center">{userData?.email || '---'}</p>
        </div>

        <div className="hidden flex-col gap-2 font-medium *:last:tracking-wide *:last:opacity-70 xl:flex">
          <p>Account Registration Date</p>
          <p>
            {!!userData?.createdAt &&
              new Date(userData?.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
          </p>
        </div>
      </div>
    </FluidContainer>
  );
};
export default UserData;
