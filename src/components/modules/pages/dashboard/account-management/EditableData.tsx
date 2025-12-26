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
import clsx from 'clsx';

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
      <div className="grid grid-cols-12 max-sm:gap-y-10">
        <div className="col-span-12 flex items-center gap-2.5 max-sm:justify-center sm:col-span-7">
          <div>{Icon}</div>

          <div className="flex flex-col">
            <h4 className="text-base font-semibold">{title}</h4>
            <p className="text-sm font-light opacity-75">{description}</p>
          </div>
        </div>

        <div className="col-span-12 flex flex-wrap items-center justify-center gap-5 sm:col-span-5 sm:justify-end">
          {isEditing ? (
            <>
              <Input
                placeholder={value || `Enter your ${title}`}
                className="!rounded-sm !ring-0"
                name={name}
                defaultValue={value}
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
            </>
          ) : (
            <>
              {value && <p className="line-clamp-1 max-w-full">{value}</p>}
              <Button
                className={clsx(
                  'min-w-20 cursor-pointer !text-white',
                  !value && '!bg-primary',
                )}
                variant={'secondary'}
                size={'sm'}
                onClick={changeIsEditing}
              >
                {value ? 'Edit' : 'Submit'}
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
export default EditableData;
