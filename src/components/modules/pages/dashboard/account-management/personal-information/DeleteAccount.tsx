// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ChevronRight, UserRoundCog, UserRoundX } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import { useRouter } from 'next/navigation';
import React from 'react';

// 📦 Internal imports
import { accountManagementContainer, flexBetween } from '~styles/tw-custom';
import { errorToast, infoToast } from '~vendors/react-toastify';

// 🧾 Local types
interface PropsT {
  username: string;
}

// ⚙️ Functional component
const DeleteAccount: React.FC<PropsT> = ({ username }) => {
  const router = useRouter();

  const freezeHandler = async () => {
    infoToast('Will be ready soon :))');
  };

  const deleteHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone. if you' re gonna be away for an specific time, you can freeze your account instead of deleting it.",
    );

    if (confirmed) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const fetchUrl = `${baseUrl}/api/user/delete-account`;

      const resp = await fetch(fetchUrl, {
        method: 'POST',
        body: JSON.stringify({ username }),
      });

      if (resp.ok && resp.status === 200) {
        router.push('/');
      } else {
        errorToast('Delete process has been failed');
      }
    } else {
      errorToast('Delete process has been failed');
    }
  };

  return (
    <div className={accountManagementContainer}>
      <h2 className="text-xl font-semibold max-sm:text-center">
        Manage Account
      </h2>

      <div className="mt-8 pl-3 *:not-first:mt-5">
        <div className={flexBetween}>
          <div className="flex items-center gap-2.5">
            <div>
              <UserRoundCog size={25} />
            </div>

            <div className="flex flex-col">
              <h4 className="text-base font-semibold">Freeze Account</h4>
              <p className="text-sm font-light opacity-75">
                Temporarily disable your account to prevent any activity while
                keeping your data intact
              </p>
            </div>
          </div>

          <Button
            onClick={freezeHandler}
            className="cursor-pointer"
            variant={'ghost'}
            size={'icon'}
          >
            <ChevronRight strokeWidth={3} />
          </Button>
        </div>

        <div className={flexBetween}>
          <div className="flex items-center gap-2.5">
            <div>
              <UserRoundX size={25} />
            </div>

            <div className="flex flex-col">
              <h4 className="text-base font-semibold">Delete Account</h4>
              <p className="text-sm font-light opacity-75">
                Once you delete your account, it is permanent and can' t be
                restored.
              </p>
            </div>
          </div>

          <Button
            onClick={deleteHandler}
            className="cursor-pointer"
            variant={'ghost'}
            size={'icon'}
          >
            <ChevronRight strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DeleteAccount;
