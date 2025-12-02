// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { Dispatch, useEffect, useRef, useState } from 'react';

// 📦 Internal imports
import type { SymbolT } from '~types/api-generated/coins/getTradingViewAvailableSymbols';
import { useSymbols, Heading, ListHeading } from './local';
import { infoToast } from '~vendors/react-toastify';
import Search from './Search';
import SymbolsListUi from './SymbolsList.ui';

// 🧾 Local types
interface PropsT {
  activeSymbol: string;
  changeSymbol: Dispatch<React.SetStateAction<string>>;
}

// ⚙️ Functional component
const SymbolsListFn: React.FC<PropsT> = (props) => {
  const { activeSymbol, changeSymbol } = props;

  const [startPoint, setStartPoint] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [symbols, setSymbols] = useState<SymbolT[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const { data, isLoading } = useSymbols(startPoint, searchQuery);

  useEffect(() => {
    console.log('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      const newSymbols = new Set([...symbols, ...data.symbols]);
      setSymbols(Array.from(newSymbols));
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (
        scrollHeight - scrollTop <= clientHeight + 50 &&
        !isScrollingRef.current
      ) {
        isScrollingRef.current = true;

        if (!data || !data.symbols_remaining) return;

        if (data.symbols_remaining === 0) {
          infoToast('No more items to get.', { autoClose: 4000 });
          return;
        } else {
          setStartPoint((prev) => prev + Math.min(data?.symbols_remaining, 50));
        }

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    const container = containerRef.current;
    if (container && startPoint > 1) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      const container = containerRef.current;
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [symbols.length]);

  const resetParams = () => {
    setStartPoint(1);
    setSymbols([]);
  };

  return (
    <div ref={containerRef} className="max-h-screen w-full overflow-y-auto">
      <Heading />
      <Search changeQuery={setSearchQuery} resetParams={resetParams} />
      <ListHeading />

      <ul className="mx-auto mt-2.5 mb-12 w-[80%] px-2">
        <SymbolsListUi
          activeSymbol={activeSymbol}
          changeSymbol={changeSymbol}
          symbols={symbols}
          isLoading={isLoading}
          startPoint={startPoint}
          changeStartPoint={setStartPoint}
        />
      </ul>
    </div>
  );
};
export default SymbolsListFn;
