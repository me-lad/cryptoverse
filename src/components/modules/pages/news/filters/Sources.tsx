// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '~core/ui/shadcn/skeleton';

// 📦 Internal imports
import type { SelectIDsT } from './local.js';
import { NewsContext } from '../NewsPage.context';
import { getNewsSources } from '~services/news';
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
const Sources: React.FC<PropsT> = (props) => {
  const { openSelect, openHandler, closeHandler } = props;
  const { params } = use(NewsContext);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newsSources'],
    queryFn: () => getNewsSources(params.language || 'EN'),
    staleTime: daysToMillisecond(3),
    gcTime: daysToMillisecond(7),
  });

  if (isLoading) return <Skeleton className="col-span-3 rounded-sm" />;

  const isOpen = openSelect === 'sources';

  return (
    <>
      {isError && <ToastError />}

      <Select closeHandler={() => closeHandler('sources')} selectId={'sources'}>
        <SelectButton
          isOpen={isOpen}
          label="News Feeds"
          onClick={
            isOpen
              ? () => closeHandler('sources')
              : () => openHandler('sources')
          }
        />

        <SelectMenu
          options={data?.Data || []}
          isOpen={isOpen}
          selectId={'sources'}
        />
      </Select>
    </>
  );
};
export default Sources;
