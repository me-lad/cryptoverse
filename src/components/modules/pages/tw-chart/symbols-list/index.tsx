// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { Skeleton } from '~core/ui/shadcn/skeleton';
import { toast } from 'react-toastify';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import type { SymbolT } from '~types/api-generated/getTradingViewAvailableSymbols';
import { getTradingViewAvailableSymbols } from '~services/coins';
import { minutesToMillisecond } from '~helpers/time';
import { useDebounce } from '~hooks/useDebounce';
import { flexCenter } from '~styles/tw-custom';
import { toastsCustomID } from '~configs/react-toastify';
import SourcesLogo from './SourcesLogo';
import { Spinner } from '@/components/core/ui/shadcn/spinner';

// 🧾 Local types
interface PropsT {
  activeSymbol: string;
  changeSymbol: Dispatch<React.SetStateAction<string>>;
}

// ⚙️ Functional component
const SymbolsList: React.FC<PropsT> = (props) => {
  const { changeSymbol, activeSymbol } = props;

  const [startPoint, setStartPoint] = useState(1);
  const [search, setSearch] = useState('');
  const [symbols, setSymbols] = useState<SymbolT[]>([]);

  const debouncedSearch = useDebounce(search, 750);

  const queryKey = ['tw-symbols', startPoint, debouncedSearch];
  const queryFn = () =>
    getTradingViewAvailableSymbols(startPoint, debouncedSearch);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    staleTime: minutesToMillisecond(60),
    gcTime: minutesToMillisecond(120),
  });

  useEffect(() => {
    if (data) setSymbols((prev) => [...prev, ...data.symbols]);
  }, [data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

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
          toast('No more items to get.', {
            type: 'info',
            autoClose: 4000,
            toastId: toastsCustomID,
          });
          return;
        } else if (data.symbols_remaining < 50) {
          setStartPoint((prev) => prev + data.symbols_remaining);
        } else {
          setStartPoint((prev) => prev + 50);
        }

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      const container = containerRef.current;
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);

  return (
    <div ref={containerRef} className="max-h-screen w-full overflow-y-auto">
      <div className={`${flexCenter} mt-5`}>
        <Link href={'/'}>
          <Image
            src={'/svgs/logo/logo-text.svg'}
            width={180}
            height={60}
            alt="Crypto Verse"
          />
        </Link>
      </div>

      <label className="has-focus-visible:border-b-primary mx-auto mt-5 flex w-[80%] items-center gap-2.5 overflow-hidden rounded-sm border px-4 py-2 text-neutral-300 transition-all">
        <div>
          <Search size={18} className="mt-0.5" />
        </div>
        <input
          placeholder="Search"
          onChange={(e) => {
            if (e.target.value.length >= 3) {
              setSearch(e.target.value);
            } else {
              setSearch('');
            }
          }}
          className="w-3/4 transition-all !outline-none placeholder:text-neutral-300 focus-visible:placeholder:text-transparent"
        />
      </label>

      <div className="mx-auto mt-10 grid w-[80%] grid-cols-12 border-b px-4 pb-2.5 text-sm opacity-60">
        <p className="col-span-8">Symbol</p>
        <p className="col-span-4">Source</p>
      </div>

      <ul className="mx-auto mt-2.5 mb-14 w-[80%] px-2">
        {isLoading && symbols.length < 50 ? (
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="mt-2.5 h-10 w-full" />
          ))
        ) : !!symbols.length ? (
          symbols.map((symbol, index) => (
            <li
              key={`${index}${symbol.symbol}`}
              className={clsx(
                'hover:text-primary grid grid-cols-12 rounded-sm py-2.5 text-sm transition-all not-last:border-b',
                activeSymbol === symbol.symbol &&
                  'text-primary border-primary pointer-events-none',
              )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() =>
                      changeSymbol(
                        symbol.symbol.replace('<em>', '').replace('</em>', ''),
                      )
                    }
                    className="col-span-8 flex cursor-pointer items-center gap-2.5"
                  >
                    <div>
                      <SourcesLogo
                        baseCurrencyLogo={symbol['base-currency-logoid']}
                        currencyLogo={symbol['currency-logoid']}
                      />
                    </div>
                    <h6 className="font-medium">
                      {symbol.symbol.replace('<em>', '').replace('</em>', '')}
                    </h6>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <span
                    dangerouslySetInnerHTML={{ __html: symbol.description }}
                  ></span>
                </TooltipContent>
              </Tooltip>

              <div className="col-span-4 flex items-center gap-1.5 text-xs">
                <Image
                  src={`https://s3-symbol-logo.tradingview.com/${symbol.source_logoid}.svg`}
                  width={16}
                  height={16}
                  alt="Binance"
                  className="rounded-full"
                />
                {symbol.exchange}
              </div>
            </li>
          ))
        ) : (
          <li>
            <p className="pt-2.5 text-center font-medium">Nothing found!</p>
          </li>
        )}

        {symbols.length >= 50 && isLoading && (
          <li className={`${flexCenter} mt-2.5`}>
            <Spinner variant="ellipsis" />
          </li>
        )}
      </ul>
    </div>
  );
};
export default SymbolsList;
