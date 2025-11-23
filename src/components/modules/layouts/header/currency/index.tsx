// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import Image from 'next/image';
import clsx from 'clsx';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';

// 📦 Internal imports
import type { CurrencyT } from '~types/coins';
import { CurrencyContext } from '@/components/contexts/Currency.context';
import { currencies } from './local';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// ⚙️ Functional component
const Currency = () => {
  const { currency, setCurrency } = use(CurrencyContext);

  const handlerCurrencyChange = (value: CurrencyT) => {
    if (currency !== value && setCurrency) {
      setCurrency(value);
    }
  };

  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger activeClassName="*:!bg-primary/85">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'secondary'}>
              <Globe />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Select Currency</TooltipContent>
        </Tooltip>
      </DropDownTrigger>

      <DropDownMenu className="mt-7 w-68 p-5">
        <h5 className="ml-2.5 text-lg font-semibold select-none">
          Select currency
        </h5>

        <ul className="mt-5">
          {currencies.map((curr) => (
            <li
              key={curr.id}
              className={clsx(
                'hover:bg-background mt-3 flex items-center gap-4 rounded-sm p-2.5 py-1.5 transition-all select-none hover:cursor-pointer',
                curr.id === currency && 'bg-background',
              )}
              onClick={() => handlerCurrencyChange(curr.id)}
            >
              <Image
                src={`/svgs/logo/currencies/${curr.id.toLowerCase()}.svg`}
                width={32}
                height={32}
                alt={curr.id}
              />
              <span title={curr.titleAttr + '  ' + curr.id}>{curr.label}</span>
            </li>
          ))}
        </ul>
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default Currency;
