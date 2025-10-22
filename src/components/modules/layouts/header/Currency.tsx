// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import Image from 'next/image';
import clsx from 'clsx';

// 📦 Internal imports
import type { CurrencyT } from '~types/coins';
import { CurrencyContext } from '~modules/Currency.context';
import { currencies } from '~constants/coins';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown/DropDown';

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
      <DropDownTrigger activeClassName="*:!bg-primary/70">
        <Button variant={'secondary'}>
          {currency}
          <Globe />
        </Button>
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
                'mt-3 flex items-center gap-4 p-2.5 py-1.5 select-none hover:cursor-pointer',
                curr.id === currency && 'bg-background rounded-sm',
              )}
              onClick={() => handlerCurrencyChange(curr.id)}
            >
              <Image
                src={`/svgs/logo/currencies/${curr.id.toLowerCase()}.svg`}
                width={32}
                height={32}
                alt={curr.id}
              />
              <span>{curr.label}</span>
            </li>
          ))}
        </ul>
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default Currency;
