// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

// 📦 Internal imports
import { toastsCustomID } from '~configs/react-toastify';

// 🧾 Local types
interface PropsT {
  message?: string;
}

// ⚙️ Functional component
export const ToastError: React.FC<PropsT> = ({ message }) => {
  message ||=
    'Something went wrong during the process. Please check your network connection and try again.';
  useEffect(() => {
    toast(message, {
      type: 'error',
      autoClose: 10_000,
      toastId: toastsCustomID,
    });
  }, []);

  return null;
};
