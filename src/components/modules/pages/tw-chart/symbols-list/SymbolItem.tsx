// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import React from 'react';
import Image from 'next/image';

// 📦 Internal imports
import type { SymbolT } from '~types/api-generated/coins/getTradingViewAvailableSymbols';
import SourcesLogo from './SourcesLogo';

// 🧾 Local types
interface PropsT extends React.ComponentProps<'li'> {
  symbol: SymbolT;
}

// ⚙️ Functional component
const SymbolItem: React.FC<PropsT> = ({ symbol, className, ...rest }) => {
  return (
    <li className={className} {...rest}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="col-span-8 flex cursor-pointer items-center gap-2.5">
            <div>
              <SourcesLogo
                baseCurrencyLogo={symbol['base-currency-logoid']}
                currencyLogo={symbol['currency-logoid']}
              />
            </div>
            <h6 className="line-clamp-1 max-w-3/5 font-medium">
              {symbol.symbol.replace('<em>', '').replace('</em>', '')}
            </h6>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span dangerouslySetInnerHTML={{ __html: symbol.description }}></span>
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
  );
};
export default SymbolItem;
