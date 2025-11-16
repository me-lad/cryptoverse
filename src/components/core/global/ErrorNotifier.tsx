// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { useEffect } from 'react';

// 📦 Internal imports
import { errorToast } from '~vendors/react-toastify';

// 🧾 Local types
interface PropsT {
  error?: string | Error;
  closeTime?: number;
}

// ⚙️ Functional component
const ErrorNotifier: React.FC<PropsT> = ({ error, closeTime }) => {
  useEffect(() => {
    errorToast(error, { autoClose: closeTime });
  }, []);

  return null;
};
export default ErrorNotifier;
