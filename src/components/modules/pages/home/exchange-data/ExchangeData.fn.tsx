// 📌 Directives
'use client';

// 📦 Third-Party imports 'react';
import dynamic from 'next/dynamic';

// 📦 Internal imports
import { useRotatingIndex } from './local';
const ExchangeDataUi = dynamic(() => import('./ExchangeData.ui'));

// ⚙️ Functional component
const ExchangeDataFn = () => {
  const visibleIndex = useRotatingIndex(0, 1, 5_000);

  return <ExchangeDataUi visibleIndex={visibleIndex as 0 | 1} />;
};
export default ExchangeDataFn;
