// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/core/ui/shadcn/skeleton';
import Link from 'next/link';

// 📦 Internal imports
import { containerDefault, flexBetween } from '~styles/tw-custom';
import { getNews } from '~services/news';
import { CatchError } from '~core/ui/shared/typography';
import { CustomTag, CustomTitle } from '~core/ui/shared/typography';
import Card from './Card';

// ⚙️ Functional component
const LatestNews = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-news'],
    queryFn: () => getNews({ language: 'EN', limit: 3 }),
  });

  if (isError) return <CatchError />;

  return (
    <section className={`${containerDefault} mt-32`}>
      <div className="relative h-fit w-full">
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
          className="hover:text-primary absolute top-0 right-0 bottom-0 m-auto flex h-fit items-center gap-1 font-medium transition-all"
          href={'/news'}
        >
          View All
          <ChevronRight size={18} />
        </Link>
      </div>

      <ul className={`${flexBetween} mt-10`}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-100 w-1/3 p-4">
                <Skeleton className="h-full w-full" />
              </div>
            ))
          : data?.Data &&
            data?.Data.map((item) => (
              <li key={item.ID} className="w-1/3 p-4">
                <Card {...item}></Card>
              </li>
            ))}
      </ul>
    </section>
  );
};
export default LatestNews;
