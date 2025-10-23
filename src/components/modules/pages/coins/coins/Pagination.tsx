// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import clsx from 'clsx';

// 📦 Internal imports
import { FavoriteCoinsContext } from '~modules/FavoriteCoins.context';
import { CoinsContext } from '../CoinsPage.context';
import { flexCenter } from '~styles/tw-custom';
import PaginationNumbers from './PaginationNumbers';

// 🧾 Local types and helpers
const totalCoinsCount = 17_000;
const calculateTotalPages = (perPage: number) => {
  return Math.ceil(totalCoinsCount / perPage);
};

// ⚙️ Functional components
const Pagination = () => {
  const { params, actions, flags } = use(CoinsContext);
  const { showFavorites } = use(FavoriteCoinsContext);
  const [totalPagesCount, setTotalPagesCount] = useState(() =>
    calculateTotalPages(params.perPage),
  );

  useEffect(() => {
    setTotalPagesCount(() => calculateTotalPages(params.perPage));
  }, [params.perPage]);

  const changePageHandler = (newPage: number) => {
    if (newPage === params.page) return;
    if (actions && !flags?.isFetching) actions.setPage(newPage);
  };

  if (showFavorites) return;

  return (
    <div className={`${flexCenter} mt-10 gap-2`}>
      {/* Previous page */}
      <Button
        variant={'ghost'}
        className={clsx('cursor-pointer', params.page === 1 && 'invisible')}
        disabled={params.page === 1 || flags?.isFetching}
        onClick={() => changePageHandler(params.page - 1)}
      >
        <ChevronLeft strokeWidth={3} size={20} className="text-white" />
      </Button>

      {/* Number */}
      <PaginationNumbers
        changePageHandler={changePageHandler}
        totalPagesCount={totalPagesCount}
      />

      {/* Next page */}
      <Button
        variant={'ghost'}
        className={clsx(
          'cursor-pointer',
          params.page === totalPagesCount && 'invisible',
        )}
        disabled={flags?.isFetching || params.page === totalPagesCount}
        onClick={() => changePageHandler(params.page + 1)}
      >
        <ChevronLeft
          strokeWidth={3}
          size={20}
          className="rotate-y-180 text-white"
        />
      </Button>
    </div>
  );
};
export default Pagination;
