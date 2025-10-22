// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useActionState, useEffect, useState } from 'react';
import { Input } from '~core/ui/shadcn/input';
import { Textarea } from '~core/ui/shadcn/textarea';
import { Button } from '~core/ui/shadcn/button';
import { toast } from 'react-toastify';

// 📦 Internal imports
import type { MessageSendResultT } from '~types/support';
import { sendMessage } from '~actions/support/support.controller';
import { toastsCustomID } from '~configs/react-toastify';
import { supportFormFields } from '~constants/support';

const SupportForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [state, action, pending] = useActionState<MessageSendResultT | null>(
    sendMessage as any,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast(state.message, {
        type: 'success',
        autoClose: 10_000,
        toastId: toastsCustomID,
        position: 'top-center',
      });
    }
    if (!state?.success && state?.errMessage) {
      toast(state.errMessage, {
        type: 'error',
        autoClose: 10_000,
        toastId: toastsCustomID,
        position: 'top-center',
      });
    }
  }, [state]);

  return (
    <form
      action={action}
      onChange={(event) => {
        const target = event.target as HTMLInputElement;
        if (target.name) {
          setFormData((prevData) => ({
            ...prevData,
            [target.name]: target.value,
          }));
        }
      }}
      className="mt-4 grid grid-cols-2 grid-rows-2"
      autoComplete="off"
    >
      {/* Fields */}
      {supportFormFields.map((field) => (
        <div key={field.id.toString()} className={field.parentClassName}>
          {/* Field */}
          {field.name === 'message' ? (
            <Textarea
              className="mt-2 !rounded-sm !ring-0"
              placeholder={field.placeholder}
              rows={6}
              name={field.name}
            ></Textarea>
          ) : (
            <Input
              className="mt-2 !rounded-sm !ring-0"
              placeholder={field.placeholder}
              name={field.name}
            />
          )}

          {/* Error */}
          {!state?.success && state?.properties![field.name] && (
            <p className="text-status-error-200 px-1 py-2 text-sm font-semibold">
              {state.properties[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* Submit button */}
      <Button
        className="col-span-2 mt-4 cursor-pointer !rounded-sm font-medium text-white"
        size="lg"
        variant="default"
        type="submit"
        disabled={
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.message ||
          pending
        }
      >
        {pending ? 'Processing ...' : 'Send'}
      </Button>
    </form>
  );
};
export default SupportForm;
