// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useRef } from 'react';

// 🧾 Local types
interface PropsT {
  symbol: string;
  theme?: 'light' | 'dark';
  height?: number;
  width?: number;
}

// ⚙️ Functional component
const TradingViewChart: React.FC<PropsT> = (props) => {
  const { symbol, height, theme, width } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      // @ts-expect-error
      if (window.TradingView) {
        // @ts-expect-error
        new window.TradingView.widget({
          autosize: true,
          symbol: `${symbol.toUpperCase()}USDT`,
          interval: '1',
          timezone: 'Etc/UTC',
          theme,
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
        });
      }
    };

    containerRef.current?.appendChild(script);
  }, [symbol, theme]);

  return (
    <div id="tradingview_chart" ref={containerRef} style={{ width, height }} />
  );
};
export default TradingViewChart;
