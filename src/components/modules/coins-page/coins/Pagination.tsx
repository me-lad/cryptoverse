// 📌 Directives
'use client';

// 📦 Third-Party imports
import { use, useEffect, useState } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

// 📦 Internal imports
import { CoinsContext } from '../CoinsPage.context';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types and helpers
const totalCoinsCount = 17_000;
const calculateTotalPages = (perPage: number) => {
  return Math.ceil(totalCoinsCount / perPage);
};

// ⚙️ Functional components

const Pagination = () => {
  const { params, actions, coins, isFetching } = use(CoinsContext);
  const [totalPagesCount, setTotalPagesCount] = useState(() =>
    calculateTotalPages(params.perPage),
  );

  useEffect(() => {
    setTotalPagesCount(() => calculateTotalPages(params.perPage));
  }, [params.perPage]);

  const changePageHandler = (newPage: number) => {
    if (newPage === params.page) return;
    if (actions && !isFetching) actions.setPage(newPage);
  };

  return (
    <div className={`${flexCenter} mt-10 gap-2`}>
      {/* Previous page */}
      <Button
        variant={'ghost'}
        className="cursor-pointer"
        disabled={params.page === 1 || isFetching}
        onClick={() => changePageHandler(params.page - 1)}
      >
        <ChevronLeft strokeWidth={3} size={20} className="text-white" />
      </Button>

      {/* Number */}
      {params.page < 4 ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <Button
              key={index}
              onClick={() => changePageHandler(index + 1)}
              className="cursor-pointer"
              variant={'ghost'}
              disabled={params.page === index + 1 || isFetching}
            >
              {index + 1}
            </Button>
          ))}

          <MoreHorizontal size={16} className="mx-4 mt-2.5" />

          <Button
            className="cursor-pointer"
            variant={'ghost'}
            onClick={() => changePageHandler(totalPagesCount)}
          >
            {totalPagesCount}
          </Button>
        </>
      ) : params.page > totalPagesCount - 3 &&
        params.page <= totalPagesCount ? (
        <>
          <Button
            className="cursor-pointer"
            variant={'ghost'}
            onClick={() => changePageHandler(1)}
          >
            1
          </Button>

          <MoreHorizontal size={16} className="mx-4 mt-2.5" />

          <div className="flex flex-row-reverse">
            {Array.from({ length: 4 }).map((_, index) => (
              <Button
                key={index}
                onClick={() => changePageHandler(totalPagesCount - index)}
                className="cursor-pointer"
                variant={'ghost'}
                disabled={params.page === totalPagesCount - index || isFetching}
              >
                {totalPagesCount - index}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <>
          <Button
            className="cursor-pointer"
            variant={'ghost'}
            onClick={() => changePageHandler(1)}
          >
            1
          </Button>

          <MoreHorizontal size={16} className="mx-4 mt-2.5" />

          <Button
            onClick={() => changePageHandler(params.page - 1)}
            className="cursor-pointer"
            variant={'ghost'}
          >
            {params.page - 1}
          </Button>
          <Button className="cursor-pointer" variant={'ghost'} disabled>
            {params.page}
          </Button>
          <Button
            onClick={() => changePageHandler(params.page + 1)}
            className="cursor-pointer"
            variant={'ghost'}
          >
            {params.page + 1}
          </Button>

          <MoreHorizontal size={16} className="mx-4 mt-2.5" />

          <Button
            className="cursor-pointer"
            variant={'ghost'}
            onClick={() => changePageHandler(totalPagesCount)}
          >
            {totalPagesCount}
          </Button>
        </>
      )}

      {/* Next page */}
      <Button
        variant={'ghost'}
        className="cursor-pointer"
        disabled={isFetching || params.page === totalPagesCount}
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
