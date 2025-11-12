// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';

// 📦 Internal imports
import AdvanceChart from '~core/global/trading-view/AdvanceChart';

// 🧾 Local types
interface PropsT {
  symbol: string;
}

// ⚙️ Functional component
const ChartView: React.FC<PropsT> = ({ symbol }) => {
  return (
    <div className="h-screen w-full">
      <AdvanceChart
        symbol=""
        fullSymbol={symbol}
        allowChangeSymbol={false}
        theme={'dark'}
      />
    </div>
  );
};
export default ChartView;
