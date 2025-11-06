// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

// 🧾 Local types
interface PropsT {
  symbol: string;
  theme?: 'light' | 'dark';
}

// ⚙️ Functional component
const MiniChart: React.FC<PropsT> = (props) => {
  const { symbol, theme = 'dark' } = props;
  const container = useRef<HTMLDivElement | null>(null);

  const queryFn = async () => {
    const response = await fetch(
      `/api/mini-chart?symbol=${encodeURIComponent(symbol)}`,
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const { data: chartData } = useQuery({
    queryKey: ['mini-chart', symbol],
    queryFn,
  });

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;

    const chartConfig = {
      symbol: chartData?.data?.[0]?.symbol || `${symbol.toUpperCase()}USD`,
      chartOnly: false,
      dateRange: '12M',
      noTimeScale: false,
      colorTheme: theme,
      isTransparent: false,
      locale: 'en',
      width: '100%',
      autosize: true,
      height: '100%',
    };

    script.innerHTML = JSON.stringify(chartConfig);

    container.current.innerHTML = '';
    container.current.appendChild(script);

    const applyRoundedToIframe = () => {
      if (!container.current) return false;

      const iframe = container.current.querySelector('iframe');
      if (!iframe) return false;

      const el = iframe as HTMLIFrameElement;
      el.style.border = '0';
      el.style.boxShadow = 'none';
      el.style.outline = 'none';
      el.style.display = 'block';
      el.style.position = 'relative';

      // Expand element to make the border be outside of the diameter so will not be visible by hidden overflow
      el.style.width = 'calc(100% + 2px)';
      el.style.height = 'calc(100% + 2px)';
      el.style.margin = '-1px 0 0 -1px';

      el.style.overflow = 'hidden';
      return true;
    };

    if (!applyRoundedToIframe()) {
      const observer = new MutationObserver(() => {
        if (applyRoundedToIframe()) {
          observer.disconnect();
        }
      });
      observer.observe(container.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [symbol, theme, chartData]);

  return <div ref={container} style={{ overflow: 'hidden' }} />;
};

export default MiniChart;
