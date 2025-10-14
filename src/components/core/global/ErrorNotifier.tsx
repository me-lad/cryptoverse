// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { useEffect } from 'react';

// 📦 Internal imports
import { showErrorToast } from '~helpers/toast';

// 🧾 Local types
interface PropsT {
  error?: string | Error;
  closeTime?: number;
}

// ⚙️ Functional component
const ErrorNotifier: React.FC<PropsT> = ({ error, closeTime }) => {
  useEffect(() => {
    showErrorToast(error, closeTime);
  }, []);

  return null;
};
export default ErrorNotifier;
