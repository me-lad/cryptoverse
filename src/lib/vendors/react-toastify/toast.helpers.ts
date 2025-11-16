import { toast, type ToastOptions } from 'react-toastify';
import { infoToastId, errorToastId, successToastId } from './toast.constants';

export const errorToast = (error?: string | Error, options?: ToastOptions) => {
  const message =
    typeof error === 'string'
      ? error
      : error?.message || 'An unexpected error occurred.';

  return toast(message, {
    type: 'error',
    toastId: errorToastId,
    ...options,
  });
};

export const successToast = (message: string, options?: ToastOptions) => {
  return toast(message, {
    type: 'success',
    toastId: successToastId,
    ...options,
  });
};

export const infoToast = (message: string, options?: ToastOptions) => {
  return toast(message, {
    type: 'info',
    toastId: infoToastId,
    ...options,
  });
};
