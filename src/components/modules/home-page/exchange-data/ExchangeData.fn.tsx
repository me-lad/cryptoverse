// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 📦 Internal imports
const ExchangeDataUi = dynamic(() => import('./ExchangeData.ui'));

// ⚙️ Functional component
const ExchangeDataFn = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevVal) => (prevVal === 0 ? 1 : 0));
    }, 5_000);

    return () => clearInterval(interval);
  }, []);

  return <ExchangeDataUi visibleIndex={visibleIndex as 0 | 1} />;
};
export default ExchangeDataFn;
