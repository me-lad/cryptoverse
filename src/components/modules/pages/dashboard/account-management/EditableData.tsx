// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useActionState, useEffect, useState } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { useRouter } from 'next/navigation';

// 📦 Internal imports
import type { AccountManagementFormState } from '~actions/dashboard/local';
import { flexBetween } from '~styles/tw-custom';
import { Input } from '~core/ui/shadcn/input';
import { Check, X } from 'lucide-react';
import { editAccount } from '~actions/dashboard/account-management.controller';
import { errorToast, infoToast, successToast } from '~vendors/react-toastify';

// 🧾 Local types
interface PropsT {
  identifier: string;
  Icon: React.ReactNode;
  title: string;
  description: string;
  name: string;
  value?: string;
}

// ⚙️ Functional component
const EditableData: React.FC<PropsT> = (props) => {
  const { Icon, title, description, value, name, identifier } = props;

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [state, action, pending] =
    useActionState<AccountManagementFormState | null>(editAccount as any, null);

  const changeIsEditing = (e: any) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    if (!state) return;

    if (state.status === 'Error') {
      errorToast(state.message);
    }

    if (state.status === 'Success') {
      successToast(state.message, {
        autoClose: 3000,
        onClose: () =>
          name === 'username'
            ? router.push('/auth/signin')
            : window.location.reload(),
      });
    }
  }, [state]);

  useEffect(() => {
    if (name === 'username' && isEditing) {
      infoToast(
        'Be aware that you should re-signin after changing your username',
        { position: 'top-center' },
      );
    }
  }, [isEditing]);

  return (
    <form action={action}>
      <div className={`${flexBetween} flex-col gap-y-5 sm:flex-row`}>
        <div className="flex items-center gap-2.5 sm:max-w-3/5">
          <div>{Icon}</div>

          <div className="flex flex-col">
            <h4 className="text-base font-semibold">{title}</h4>
            <p className="line-clamp-1 text-sm font-light opacity-75">
              {description}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex max-w-2/5 items-center gap-5">
            <Input
              placeholder={value || `Enter your ${title}`}
              className="min-w-20 !rounded-sm !ring-0 max-md:placeholder:text-transparent md:min-w-40 lg:min-w-60"
              name={name}
            />

            <input type="hidden" name="identifier" value={identifier} />

            <div className="flex items-center">
              <Button
                className="cursor-pointer"
                variant={'ghost'}
                size={'icon'}
                type="submit"
              >
                <Check />
              </Button>
              <Button
                className="cursor-pointer"
                variant={'ghost'}
                size={'icon'}
                onClick={changeIsEditing}
              >
                <X />
              </Button>
            </div>
          </div>
        ) : (
          <>
            {value ? (
              <div className="flex items-center gap-5 sm:max-w-2/5">
                <p className="line-clamp-1">{value}</p>
                <Button
                  className="min-w-20 cursor-pointer"
                  variant={'secondary'}
                  size={'sm'}
                  onClick={changeIsEditing}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <Button
                className="min-w-20 cursor-pointer text-white"
                variant={'default'}
                size={'sm'}
                onClick={changeIsEditing}
              >
                Submit
              </Button>
            )}
          </>
        )}
      </div>
    </form>
  );
};
export default EditableData;
