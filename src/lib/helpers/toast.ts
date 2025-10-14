import { toast } from 'react-toastify';
import { showErrorToastId } from '~configs/react-toastify';

export const showErrorToast = (error?: string | Error, closeTime?: number) => {
  const message =
    typeof error === 'string'
      ? error
      : error?.message || 'An unexpected error occurred.';

  toast(message, {
    type: 'error',
    autoClose: closeTime || 4000,
    toastId: showErrorToastId,
  });
};
