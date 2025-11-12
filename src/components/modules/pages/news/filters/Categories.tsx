// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '~core/ui/shadcn/skeleton';
import { ChevronDown } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React from 'react';

// 📦 Internal imports
import { DropDownAggregator, DropDownTrigger } from '~core/global/dropdown';
import { getNewsCategories } from '~services/news';
import { ToastError } from '~core/ui/shared/typography';
import { daysToMillisecond } from '~helpers/time';
import SelectMenu from './SelectMenu';

// ⚙️ Functional component
const Categories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newsCategories'],
    queryFn: () => getNewsCategories(),
    staleTime: daysToMillisecond(3),
    gcTime: daysToMillisecond(7),
  });

  if (isLoading)
    return <Skeleton className="col-span-12 min-h-full max-sm:h-10" />;

  return (
    <>
      {isError && <ToastError />}

      <DropDownAggregator className="col-span-12 min-h-full sm:col-span-3">
        <DropDownTrigger activeClassName="*:!bg-primary *:*:last:rotate-180">
          <Button className="w-full rounded-sm" size={'lg'} variant={'outline'}>
            Include
            <ChevronDown
              strokeWidth={2.5}
              className="mt-1 transition-all duration-300"
            />
          </Button>
        </DropDownTrigger>

        <SelectMenu selectId={'categories'} options={data?.Data || []} />
      </DropDownAggregator>

      <DropDownAggregator className="col-span-12 min-h-full sm:col-span-3">
        <DropDownTrigger activeClassName="*:!bg-primary *:*:last:rotate-180">
          <Button className="w-full rounded-sm" size={'lg'} variant={'outline'}>
            Exclude
            <ChevronDown
              strokeWidth={2.5}
              className="mt-1 transition-all duration-300"
            />
          </Button>
        </DropDownTrigger>

        <SelectMenu selectId={'excludeCategories'} options={data?.Data || []} />
      </DropDownAggregator>
    </>
  );
};
export default Categories;
