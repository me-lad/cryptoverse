// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import Link from 'next/link';

// 📦 Internal imports
import type { HeaderReceivableUserDataT } from '~types/dto/user';
import { flexCenter } from '~styles/tw-custom';

import Notifications from './notifications';
import Profile from './profile';

// 🧾 Local types
interface PropsT {
  isAuthenticated: boolean;
  userData?: HeaderReceivableUserDataT;
}

// ⚙️ Functional component
export default function HeaderAccountUi({ isAuthenticated, userData }: PropsT) {
  return (
    <>
      {isAuthenticated ? (
        <div className={`${flexCenter} ml-1 gap-4 pt-1`}>
          <Notifications />

          {/* Account center */}
          <Profile userData={userData} />
        </div>
      ) : (
        // Signin/Signup
        <Button
          variant="default"
          size="default"
          className="px-8 text-white *:transition-all"
        >
          <Link href={'/auth/signup'}>Signup</Link>/
          <Link href={'/auth/signin'}>Signin</Link>
        </Button>
      )}
    </>
  );
}
