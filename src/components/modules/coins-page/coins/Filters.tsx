// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use } from 'react';
import { z } from 'zod';
import { Button } from '~core/ui/shadcn/button';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { showErrorToast } from '~helpers/toast';
import { CurrencyT } from '~types/coins';
import { CurrencyContext } from '~modules/Currency.context';

// ⚙️ Functional component
const Filters = () => {
  const { actions, isFetching, params } = use(CoinsContext);
  const { currency, setCurrency } = use(CurrencyContext);

  const pageSizeChangeHandler = (value: number) => {
    if (isFetching || value === params.perPage) return;

    const pageSizeInputSchema = z
      .number('Please enter a valid number')
      .min(20, { error: 'The minimum page size is 20.' })
      .max(100, { error: 'The maximum page size is 100.' });

    const result = pageSizeInputSchema.safeParse(value);

    if (!result.success) {
      showErrorToast(z.treeifyError(result.error).errors[0]);
    }

    if (actions && result.data) actions.setPerPage(result.data);
  };

  const handlerCurrencyChange = (value: CurrencyT) => {
    if (currency !== value && setCurrency) {
      setCurrency(value);
    }
  };

  const currencies: CurrencyT[] = ['USD', 'EUR', 'GBP', 'JPY', 'IRR'];

  return (
    <div className="flex items-center gap-4">
      {/* Table source */}
      <div className="relative flex items-center gap-5 font-semibold">
        <span className="cursor-pointer">All</span>
        <span className="cursor-pointer">Favorites</span>
        <span className="bg-primary absolute top-full mt-1 h-[2px] w-5"></span>
      </div>

      {/* Separator */}
      <div className="h-8 w-[1px] bg-neutral-500"></div>

      {/* Order  */}
      <div className="relative flex items-center gap-5 font-semibold">
        <span
          className="cursor-pointer"
          onClick={() => actions && actions.setOrder('market_cap_desc')}
        >
          Market Cap
        </span>
        <span
          className="cursor-pointer"
          onClick={() => actions && actions.setOrder('volume_desc')}
        >
          Total Volume
        </span>
        <span
          className={clsx(
            'bg-primary absolute top-full mt-1 h-[2px] transition-all duration-300',
            params.order === 'market_cap_desc'
              ? 'w-20'
              : 'w-[5.7rem] translate-x-[6.5rem]',
          )}
        ></span>
      </div>

      {/* Separator */}
      <div className="h-8 w-[1px] bg-neutral-500"></div>

      {/* Page size */}
      <p>Coins count on each page</p>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          pageSizeChangeHandler(
            +(e.currentTarget.firstElementChild as HTMLInputElement).value,
          );
          (e.currentTarget.firstElementChild as HTMLInputElement).value = '';
        }}
      >
        <input
          type="text"
          className="focus-visible:border-primary bg-background-lighter w-12 rounded-sm border-b border-transparent px-2.5 !outline-0"
        />
        <Button
          variant={'secondary'}
          className="cursor-pointer !rounded-sm"
          size={'icon'}
          type="submit"
        >
          <Check />
        </Button>
      </form>

      {/* Separator */}
      <div className="h-8 w-[1px] bg-neutral-500"></div>

      {/* Currency */}
      <div className="flex items-center gap-3 font-semibold">
        {currencies.map((curr, index) => (
          <div
            key={curr}
            className="relative cursor-pointer"
            onClick={() => handlerCurrencyChange(curr)}
            title={curr}
          >
            <Image
              src={`/svgs/logo/currencies/${curr.toLowerCase()}.svg`}
              width={27}
              height={27}
              alt={curr}
              className={clsx(curr === 'JPY' && '-translate-x-[1.5px]')}
            />

            <span
              className={clsx(
                'bg-primary invisible absolute top-full mt-1 h-[1.5px] w-full transition-transform ease-in',
                curr === currency && 'visible translate-x-0',

                currencies.findIndex((item) => item === currency) - index > 2
                  ? 'translate-x-20'
                  : currencies.findIndex((item) => item === currency) - index <=
                        2 &&
                      currencies.findIndex((item) => item === currency) -
                        index >
                        0
                    ? 'translate-x-10'
                    : currencies.findIndex((item) => item === currency) -
                          index <=
                          0 &&
                        currencies.findIndex((item) => item === currency) -
                          index >
                          -2
                      ? '-translate-x-10'
                      : '-translate-x-20',
              )}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Filters;
