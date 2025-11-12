// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '~core/ui/shadcn/skeleton';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import { containerDefault } from '~styles/tw-custom';
import { getNews } from '~services/news';
import { CatchError } from '~core/ui/shared/typography';
import { CustomTag, CustomTitle } from '~core/ui/shared/typography';
import Card from './Card';

// ⚙️ Functional component
const LatestNews = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-news'],
    queryFn: () => getNews({ language: 'EN', limit: 9 }),
  });

  if (isError) return <CatchError />;

  return (
    <section className={`${containerDefault} relative mt-32`}>
      <div className="h-fit w-full">
        <CustomTag text="News" />
        <CustomTitle
          text={
            <>
              Always stay informed with{' '}
              <span className="text-primary font-bold">CryptoVerse</span>
            </>
          }
        />
        <Link
          className="hover:text-primary absolute top-full right-5 flex h-fit items-center gap-1 font-medium transition-all lg:top-[2.75rem] lg:right-0"
          href={'/news'}
        >
          View All
          <ChevronRight size={18} />
        </Link>
      </div>

      <ul className="mt-10 flex justify-between overflow-x-auto max-lg:gap-5">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[30rem] max-w-11/12 min-w-11/12 py-4 sm:max-w-1/2 sm:min-w-1/2 lg:max-w-[32.5%] lg:min-w-[32.5%]"
              >
                <Skeleton className="h-full w-full" />
              </div>
            ))
          : data?.Data &&
            data?.Data.map((item, index) => (
              <li
                key={item.ID}
                className={clsx(
                  'min-h-full max-w-11/12 min-w-11/12 py-4 sm:max-w-1/2 sm:min-w-1/2 lg:max-w-[32.5%] lg:min-w-[32.5%]',
                  index > 2 && 'lg:hidden',
                )}
              >
                <Card {...item}></Card>
              </li>
            ))}
      </ul>
    </section>
  );
};
export default LatestNews;
