// 📦 Third-Party imports
import { Skeleton } from '~core/ui/shadcn/skeleton';
import { Spinner } from '~core/ui/shadcn/spinner';
import { Button } from '~core/ui/shadcn/button';
import React, { Dispatch } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { SymbolT } from '@/lib/types/api-generated/coins/getTradingViewAvailableSymbols';
import { flexCenter } from '~styles/tw-custom';
import SymbolItem from './SymbolItem';

// 🧾 Local types
interface PropsT {
  activeSymbol: string;
  changeSymbol: Dispatch<React.SetStateAction<string>>;
  symbols: SymbolT[];
  isLoading: boolean;
  startPoint: number;
  changeStartPoint: Dispatch<React.SetStateAction<number>>;
}

// ⚙️ Functional component
const SymbolsListUi: React.FC<PropsT> = (props) => {
  const {
    activeSymbol,
    changeSymbol,
    changeStartPoint,
    isLoading,
    startPoint,
    symbols,
  } = props;

  // Mount skelton loading return
  if (isLoading && symbols.length < 50) {
    return Array.from({ length: 20 }).map((_, index) => (
      <li className="w-full" key={index}>
        <Skeleton className="mt-2.5 h-10 w-full" />
      </li>
    ));
  }

  // Fallback return
  if (!symbols.length) {
    return (
      <li>
        <p className="pt-2.5 text-center font-medium">Nothing found!</p>
      </li>
    );
  }

  // Main return
  return (
    <>
      {symbols.map((symbol, index) => (
        <SymbolItem
          key={`${index}${symbol.symbol}`}
          symbol={symbol}
          onClick={() =>
            changeSymbol(symbol.symbol.replace('<em>', '').replace('</em>', ''))
          }
          className={clsx(
            'hover:text-primary grid cursor-pointer grid-cols-12 rounded-sm py-2.5 text-sm transition-all not-last:border-b',
            activeSymbol === symbol.symbol &&
              'text-primary border-primary pointer-events-none',
          )}
        />
      ))}

      {isLoading && symbols.length >= 50 && (
        <li className={`${flexCenter} mt-2.5`}>
          <Spinner variant="ellipsis" />
        </li>
      )}

      {startPoint === 1 && !!symbols.length && (
        <li className={flexCenter}>
          <Button
            className="mt-8 cursor-pointer !px-8 font-semibold text-white"
            variant={'outline'}
            onClick={() => changeStartPoint((prev) => prev + 49)}
          >
            Load More
          </Button>
        </li>
      )}
    </>
  );
};
export default SymbolsListUi;
