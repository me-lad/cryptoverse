// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

// 📦 Internal imports
import { FormStatusKinds, FormKinds } from '~constants/form';
import { FormContext } from './AuthForm.context';
import { errorToast, successToast } from '~vendors/react-toastify';

// ⚙️ Functional component
const FormResultHandler = () => {
  const router = useRouter();
  const { state, activeForm, resetPasswordForm, verifyForm } = use(FormContext);

  useEffect(() => {
    if (state.redirectNeed && state.toastNeed) {
      const autoClose = state.toastMessage.length >= 100 ? 25000 : 10000;
      const onClose = () =>
        state.redirectPath.startsWith('/') && router.push(state.redirectPath);

      if (state.status === FormStatusKinds.Error) {
        errorToast(state.toastMessage, { autoClose, onClose });
      } else {
        successToast(state.toastMessage, { autoClose, onClose });
      }

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
      const autoClose = state.toastMessage.length >= 100 ? 25000 : 10000;

      if (state.status === FormStatusKinds.Error) {
        if (verifyForm?.setIsCodeIncorrect) {
          verifyForm?.setIsCodeIncorrect(true);
        }

        errorToast(state.toastMessage, { autoClose });
      } else {
        successToast(state.toastMessage, { autoClose });
      }
    }
  }, [state]);

  return null;
};
export default FormResultHandler;
