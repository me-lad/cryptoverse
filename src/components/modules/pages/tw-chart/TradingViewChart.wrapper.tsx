// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// 📦 Internal imports
import { toastsCustomID } from '~configs/react-toastify';
import ChartView from './chart-view';
import SymbolsList from './symbols-list';

// ⚙️ Functional component
const TradingViewChartWrapper = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');

  useEffect(() => {
    toast('Use a VPN if you have any problems visiting this page.', {
      type: 'info',
      autoClose: 6000,
      toastId: toastsCustomID,
      position: 'top-center',
      closeButton: false,
    });
  }, []);

  return (
    <div className="grid max-h-screen grid-cols-12 grid-rows-1 overflow-hidden">
      <div className="col-span-9">
        <ChartView key={selectedSymbol} symbol={selectedSymbol} />
      </div>

      <div className="bg-background-lighter col-span-3 h-screen">
        <SymbolsList
          activeSymbol={selectedSymbol}
          changeSymbol={setSelectedSymbol}
        />
      </div>
    </div>
  );
};
export default TradingViewChartWrapper;
