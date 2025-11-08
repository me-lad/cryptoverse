// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

// 🧾 Local types
interface PropsT {
  symbol: string;
  theme?: 'light' | 'dark';
  height?: number;
  width?: number;
}

// ⚙️ Functional component
const AdvanceChart: React.FC<PropsT> = (props) => {
  const { symbol, height, theme, width } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const queryFn = async () => {
    const response = await fetch(
      `/api/widgets/advanced-chart?symbol=${encodeURIComponent(symbol)}`,
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const { data: chartData } = useQuery({
    queryKey: ['advanced-chart', symbol],
    queryFn,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      // @ts-expect-error
      if (window.TradingView) {
        const chartSymbol =
          chartData?.data?.[0]?.symbol || `${symbol.toUpperCase()}USDT`;
        // @ts-expect-error
        new window.TradingView.widget({
          autosize: true,
          symbol: chartSymbol,
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

        const applyStylesToIframe = () => {
          if (!containerRef.current) return false;

          const iframe = containerRef.current.querySelector('iframe');
          if (!iframe) return false;

          const el = iframe as HTMLIFrameElement;
          el.style.border = '0';
          el.style.boxShadow = 'none';
          el.style.outline = 'none';
          el.style.overflow = 'hidden';
          el.style.width = 'calc(100% + 2px)';
          el.style.height = 'calc(100% + 2px)';
          el.style.margin = '-1px 0 0 -1px';

          return true;
        };

        if (!applyStylesToIframe()) {
          const observer = new MutationObserver(() => {
            if (applyStylesToIframe()) {
              observer.disconnect();
            }
          });
          observer.observe(containerRef.current!, {
            childList: true,
            subtree: true,
          });
          return () => observer.disconnect();
        }
      }
    };

    containerRef.current?.appendChild(script);
  }, [symbol, theme, chartData]);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      style={{ width, height, overflow: 'hidden' }}
    />
  );
};

export default AdvanceChart;
