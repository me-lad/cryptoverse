// 📌 Directives
'use client';

// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { use } from 'react';
import { z } from 'zod';
import { Button } from '~core/ui/shadcn/button';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import { FavoriteCoinsContext } from '@/components/contexts/FavoriteCoins.context';
import { CoinsContext } from '../CoinsPage.context';
import { errorToast } from '~vendors/react-toastify';
import { CurrencyT } from '~types/coins';
import { CurrencyContext } from '@/components/contexts/Currency.context';
import { currencies } from '~modules/layouts/header/currency/local';

// ⚙️ Functional components
const CoinsSourceToggle = () => {
  const { actions } = use(CoinsContext);
  const { showFavorites, setShowFavorites } = use(FavoriteCoinsContext);

  return (
    <div className="relative flex items-center gap-5 font-semibold">
      <span
        onClick={() => actions && setShowFavorites(false)}
        className="cursor-pointer"
      >
        All
      </span>
      <span
        onClick={() => actions && setShowFavorites(true)}
        className="cursor-pointer"
      >
        Favorites
      </span>
      <span
        className={clsx(
          'bg-primary absolute top-full mt-1 h-[2px] transition-transform',
          showFavorites
            ? 'w-16 translate-x-10 duration-300'
            : 'w-5 duration-500',
        )}
      ></span>
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
  const { actions, params, flags } = use(CoinsContext);

  const changeHandler = (value: number) => {
    if (flags?.isFetching || value === params.perPage) return;

    const pageSizeInputSchema = z
      .number('Please enter a valid number')
      .min(20, { error: 'The minimum page size is 20.' })
      .max(100, { error: 'The maximum page size is 100.' });

    const result = pageSizeInputSchema.safeParse(value);

    if (!result.success) {
      errorToast(z.treeifyError(result.error).errors[0]);
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
    <div className="max-lg:hidden">
      <form
        className="relative flex gap-2"
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
          className="focus-visible:border-primary bg-background-lighter peer w-12 rounded-sm border-b border-transparent px-2.5 !outline-0"
        />
        <Button
          variant={'secondary'}
          className="cursor-pointer !rounded-sm"
          size={'icon'}
          type="submit"
        >
          <Check />
        </Button>

        <p className="bg-background-lighter invisible absolute bottom-12 -left-3/4 flex w-max items-center justify-center gap-1 rounded-sm p-2 text-sm opacity-0 transition-all peer-focus-visible:visible peer-focus-visible:opacity-100">
          Coins count on each page
          <small title="Current count" className="mt-0.5 text-xs">
            ( {params.perPage} )
          </small>
        </p>
      </form>
    </div>
  );
};

const CoinsCurrencyChange = () => {
  const { currency, setCurrency } = use(CurrencyContext);

  const changeHandler = (value: CurrencyT) => {
    if (currency !== value && setCurrency) {
      setCurrency(value);
    }
  };

  return (
    <div className="flex items-center gap-3 font-semibold">
      {currencies.map(({ id, label }, index) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <div
              className="relative cursor-pointer"
              onClick={() => changeHandler(id)}
            >
              <Image
                src={`/svgs/logo/currencies/${id.toLowerCase()}.svg`}
                width={27}
                height={27}
                alt={id}
                className={clsx(id === 'JPY' && '-translate-x-[1.5px]')}
              />

              <span
                className={clsx(
                  'bg-primary invisible absolute top-full mt-1 h-[1.5px] w-full transition-transform ease-in',
                  id === currency && 'visible translate-x-0',

                  currencies.findIndex((item) => item.id === currency) - index >
                    2
                    ? 'translate-x-20'
                    : currencies.findIndex((item) => item.id === currency) -
                          index <=
                          2 &&
                        currencies.findIndex((item) => item.id === currency) -
                          index >
                          0
                      ? 'translate-x-10'
                      : currencies.findIndex((item) => item.id === currency) -
                            index <=
                            0 &&
                          currencies.findIndex((item) => item.id === currency) -
                            index >
                            -2
                        ? '-translate-x-10'
                        : '-translate-x-20',
                )}
              ></span>
            </div>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

const FiltersAggregator = () => {
  const { showFavorites } = use(FavoriteCoinsContext);

  return (
    <div className="flex items-center gap-4 max-sm:flex-wrap max-sm:justify-center">
      {/* Table source */}
      <CoinsSourceToggle />

      <div className="h-8 w-[1px] bg-neutral-500 max-[23.875em]:invisible max-[22.82em]:hidden"></div>

      {/* Order  */}
      {!showFavorites && <CoinsOrderToggle />}

      {/* Separator */}
      {!showFavorites && (
        <div className="h-8 w-[1px] bg-neutral-500 max-[37.5em]:invisible max-[36.375em]:hidden"></div>
      )}

      {/* Page size */}
      {!showFavorites && <CoinsPageSizeChange />}

      {/* Separator */}
      {!showFavorites && (
        <div className="h-8 w-[1px] bg-neutral-500 max-lg:hidden"></div>
      )}

      {/* Currency */}
      <CoinsCurrencyChange />
    </div>
  );
};

export default FiltersAggregator;
