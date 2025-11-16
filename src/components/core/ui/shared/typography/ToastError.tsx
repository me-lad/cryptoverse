// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect } from 'react';

// 📦 Internal imports
import { errorToast } from '~vendors/react-toastify';

// 🧾 Local types
interface PropsT {
  message?: string;
}

// ⚙️ Functional component
export const ToastError: React.FC<PropsT> = ({ message }) => {
  message ||=
    'Something went wrong during the process. Please check your network connection and try again.';
  useEffect(() => {
    errorToast(message, { autoClose: 10_000 });
  }, []);

  return null;
};
