// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// 📦 Internal imports
import { FormStatusKinds, FormKinds } from '~constants/form';
import { FormContext } from './AuthForm.context';
import { toastsCustomID } from '~configs/react-toastify';

// ⚙️ Functional component
const FormResultHandler = () => {
  const router = useRouter();
  const { state, activeForm, resetPasswordForm } = use(FormContext);

  useEffect(() => {
    if (state.redirectNeed && state.toastNeed) {
      toast(state.toastMessage, {
        type: state.status === FormStatusKinds.Error ? 'error' : 'success',
        autoClose: state.toastMessage.length >= 100 ? 25000 : 10000,
        onClose: () =>
          state.redirectPath.startsWith('/') && router.push(state.redirectPath),
      });

      if (
        activeForm === FormKinds.ResetPassword &&
        state.status === FormStatusKinds.Success &&
        state.redirectPath === '2'
      ) {
        resetPasswordForm.setFormStep(state.redirectPath);
      }

      return;
    }

    if (state.redirectNeed) {
      return router.push(state.redirectPath);
    }

    if (state.toastNeed) {
      toast(state.toastMessage, {
        type: state.status === FormStatusKinds.Error ? 'error' : 'success',
        toastId: toastsCustomID,
        autoClose: state.toastMessage.length >= 100 ? 25000 : 10000,
      });
    }
  }, [state]);

  return null;
};
export default FormResultHandler;
