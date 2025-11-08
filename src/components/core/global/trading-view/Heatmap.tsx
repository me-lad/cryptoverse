// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

// 🧾 Local types
interface PropsT {
  theme?: 'light' | 'dark';
  height?: number;
  width?: number;
}

// ⚙️ Functional component
const Heatmap: React.FC<PropsT> = (props) => {
  const { height, width, theme = 'dark' } = props;
  const container = useRef<HTMLDivElement>(null);

  const queryFn = async () => {
    const response = await fetch('/api/widgets/heatmap-widget');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const { data: marketData } = useQuery({
    queryKey: ['heatmap-widget'],
    queryFn,
  });

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js';
    script.type = 'text/javascript';
    script.async = true;

    // Configure widget with server data if available
    const widgetConfig = {
      dataSource: 'Crypto',
      blockSize: marketData?.data?.sort?.sortBy || 'market_cap_calc',
      blockColor: '24h_close_change|5',
      locale: 'en',
      symbolUrl: '',
      colorTheme: theme,
      hasTopBar: true,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: width || '100%',
      height: height || '100%',
      isTransparent: true,
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    container.current.innerHTML = '';
    container.current.appendChild(script);

    // Apply styles to iframe when it's created
    const applyStylesToIframe = () => {
      if (!container.current) return false;

      const iframe = container.current.querySelector('iframe');
      if (!iframe) return false;

      const el = iframe as HTMLIFrameElement;
      el.style.border = '0';
      el.style.boxShadow = 'none';
      el.style.outline = 'none';
      el.style.display = 'block';
      el.style.position = 'relative';
      el.style.width = 'calc(100% + 2px)';
      el.style.height = 'calc(100% + 2px)';
      el.style.margin = '-1px 0 0 -1px';
      el.style.overflow = 'hidden';

      return true;
    };

    if (!applyStylesToIframe()) {
      const observer = new MutationObserver(() => {
        if (applyStylesToIframe()) {
          observer.disconnect();
        }
      });
      observer.observe(container.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [theme, height, width, marketData]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/heatmap/crypto/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Crypto Heatmap</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
};

export default Heatmap;
