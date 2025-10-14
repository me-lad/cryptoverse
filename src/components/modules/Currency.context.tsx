// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { createContext, useEffect, useRef, useState } from 'react';

// 📦 Internal imports
import type {
  CurrencyContextT,
  CurrencyConversionFactorsT,
  CurrencyT,
} from '~types/coins';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { getCurrencyConversionFactors } from '~services/coins';

// 🧾 Local types & variables
export const CurrencyContext = createContext<Partial<CurrencyContextT>>({});

interface PropsType {
  children: React.ReactNode;
}

// ⚙️ Functional component
const CurrencyContextProvider: React.FC<PropsType> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<CurrencyT>(
    'currency',
    'USD',
  );
  const [factors, setFactors] = useState<CurrencyConversionFactorsT>();
  const hasMounted = useRef(false);

  useEffect(() => {
    const getFactors = async () => {
      if (hasMounted.current) {
        const resp = await getCurrencyConversionFactors(selectedCurrency);
        if (!resp) return;

        setFactors(resp);
      } else {
        hasMounted.current = true;
      }
    };

    getFactors();
  }, [selectedCurrency]);

  return (
    <CurrencyContext
      value={{
        currency: selectedCurrency,
        conversionFactors: factors,
        setCurrency: setSelectedCurrency,
      }}
    >
      {children}
    </CurrencyContext>
  );
};
export default CurrencyContextProvider;
