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

// ⚙️ Functional components
const CoinsSourceToggle = () => {
  return (
    <div className="relative flex items-center gap-5 font-semibold">
      <span className="cursor-pointer">All</span>
      <span className="cursor-pointer">Favorites</span>
      <span className="bg-primary absolute top-full mt-1 h-[2px] w-5"></span>
    </div>
  );
};

const CoinsOrderToggle = () => {
  const { actions, params } = use(CoinsContext);

  return (
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
  );
};

const CoinsPageSizeChange = () => {
  const { actions, params, isFetching } = use(CoinsContext);

  const changeHandler = (value: number) => {
    if (isFetching || value === params.perPage) return;

    const pageSizeInputSchema = z
      .number('Please enter a valid number')
      .min(20, { error: 'The minimum page size is 20.' })
      .max(100, { error: 'The maximum page size is 100.' });

    const result = pageSizeInputSchema.safeParse(value);

    if (!result.success) {
      showErrorToast(z.treeifyError(result.error).errors[0]);
    }

    if (actions && result.data) {
      // const newPageNumber = Math.round(currentFirstCoinIndex / result.data);
      const totalCoinsCount = 17_000;
      const currentPageFirstIndex = (params.page - 1) * params.perPage + 1;
      const newPageNumber =
        currentPageFirstIndex <= result.data
          ? 1
          : Math.floor(currentPageFirstIndex / result.data + 1);
      const lastAvailablePage = Math.floor(totalCoinsCount / result.data);

      actions.setPerPage(result.data);
      actions.setPage(
        lastAvailablePage < newPageNumber ? lastAvailablePage : newPageNumber,
      );
    }
  };

  return (
    <>
      <p>
        Coins count on each page{' '}
        <small title="Current count" className="align-middle text-xs">
          ( {params.perPage} )
        </small>
      </p>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          changeHandler(
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
    </>
  );
};

const CoinsCurrencyChange = () => {
  const { currency, setCurrency } = use(CurrencyContext);

  const changeHandler = (value: CurrencyT) => {
    if (currency !== value && setCurrency) {
      setCurrency(value);
    }
  };

  const currencies: CurrencyT[] = ['USD', 'EUR', 'GBP', 'JPY', 'IRR'];

  return (
    <div className="flex items-center gap-3 font-semibold">
      {currencies.map((curr, index) => (
        <div
          key={curr}
          className="relative cursor-pointer"
          onClick={() => changeHandler(curr)}
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
                    currencies.findIndex((item) => item === currency) - index >
                      0
                  ? 'translate-x-10'
                  : currencies.findIndex((item) => item === currency) - index <=
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
  );
};

const FiltersAggregator = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Table source */}
      <CoinsSourceToggle />

      {/* Separator */}
      <div className="h-8 w-[1px] bg-neutral-500"></div>

      {/* Order  */}
      <CoinsOrderToggle />

      {/* Separator */}
      <div className="h-8 w-[1px] bg-neutral-500"></div>

      {/* Page size */}
      <CoinsPageSizeChange />

      {/* Separator */}
      <div className="h-8 w-[1px] bg-neutral-500"></div>

      {/* Currency */}
      <CoinsCurrencyChange />
    </div>
  );
};

export default FiltersAggregator;
