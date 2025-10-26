// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '~core/ui/shadcn/skeleton';
import { ChevronDown } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import { NewsContext } from '../NewsPage.context';
import { getNewsSources } from '~services/news';
import { daysToMillisecond } from '~helpers/time';
import { ToastError } from '~core/ui/shared/typography';
import { DropDownAggregator, DropDownTrigger } from '~core/global/dropdown';
import SelectMenu from './SelectMenu';

// ⚙️ Functional component
const Sources = () => {
  const { params } = use(NewsContext);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newsSources'],
    queryFn: () => getNewsSources(params.language || 'EN'),
    staleTime: daysToMillisecond(3),
    gcTime: daysToMillisecond(7),
  });

  if (isLoading) return <Skeleton className="col-span-3 rounded-sm" />;

  return (
    <>
      {isError && <ToastError />}

      <DropDownAggregator className="col-span-3 min-h-full">
        <DropDownTrigger activeClassName="*:!bg-primary *:*:last:rotate-180">
          <Button className="w-full rounded-sm" size={'lg'} variant={'outline'}>
            News Feeds
            <ChevronDown
              strokeWidth={2.5}
              className="mt-1 transition-all duration-300"
            />
          </Button>
        </DropDownTrigger>

        <SelectMenu selectId={'sources'} options={data?.Data || []} />
      </DropDownAggregator>
    </>
  );
};
export default Sources;
