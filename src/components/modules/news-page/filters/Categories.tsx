// 📌 Directives
'use client';

// 📦 Third-Party imports
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/core/ui/shadcn/skeleton';

// 📦 Internal imports
import type { SelectIDsT } from './local.ts';
import { getNewsCategories } from '~services/news';
import { ToastError } from '~core/ui/shared/typography';
import { daysToMillisecond } from '~helpers/time';
import Select from './Select';
import SelectButton from './SelectButton';
import SelectMenu from './SelectMenu';

// 🧾 Local types
interface PropsT {
  openSelect: SelectIDsT;
  openHandler: (id: SelectIDsT) => void;
  closeHandler: (id: SelectIDsT) => void;
}

// ⚙️ Functional component
const Categories: React.FC<PropsT> = (props) => {
  const { openSelect, openHandler, closeHandler } = props;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newsCategories'],
    queryFn: () => getNewsCategories(),
    staleTime: daysToMillisecond(3),
    gcTime: daysToMillisecond(7),
  });

  if (isLoading) return <Skeleton className="col-span-6 rounded-sm" />;

  const isOpenCategories = openSelect === 'categories';
  const isOpenExcludeCat = openSelect === 'excludeCategories';

  return (
    <>
      {isError && <ToastError />}

      <Select selectId={'categories'}>
        <SelectButton
          label="Include"
          isOpen={isOpenCategories}
          onClick={isOpenCategories ? () => closeHandler('categories') : () => openHandler('categories')}
        />

        <SelectMenu options={data?.Data || []} isOpen={isOpenCategories} selectId={'categories'} />
      </Select>

      <Select selectId={'excludeCategories'}>
        <SelectButton
          label="Exclude"
          isOpen={isOpenExcludeCat}
          onClick={isOpenExcludeCat ? () => closeHandler('excludeCategories') : () => openHandler('excludeCategories')}
        />

        <SelectMenu options={data?.Data || []} isOpen={isOpenExcludeCat} selectId={'excludeCategories'} />
      </Select>
    </>
  );
};
export default Categories;
