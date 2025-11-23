// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { use, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// 📦 Internal imports
import type { SourceDataEntity } from '@/lib/types/api-generated/news/getNewsSources';
import type { CategoryDataEntity } from '@/lib/types/api-generated/news/getNewsCategories';
import { NewsContext } from '../NewsPage.context';
import { infoToast } from '~vendors/react-toastify';

// 🧾 Local types
type PropsT = {
  isSelected: boolean;
  isDisabled: boolean;
} & (
  | {
      data: SourceDataEntity;
      selectId: 'sources';
    }
  | {
      data: CategoryDataEntity;
      selectId: 'categories' | 'excludeCategories';
    }
);

// ⚙️ Functional component
const SelectOption: React.FC<PropsT> = (props) => {
  const { params, actions } = use(NewsContext);
  const { data, selectId, isSelected, isDisabled } = props;

  const [selected, setSelected] = useState(isSelected);

  const changeHandler = (checked: boolean) => {
    let currentFilters = (params[selectId]?.split(',') || []).filter(Boolean);

    if (checked) {
      if (selectId === 'sources' && params.searchString) {
        currentFilters = Array.from(new Set([data.ID.toString()]));
      } else {
        currentFilters = Array.from(
          new Set([...currentFilters, data.ID.toString()]),
        );
      }
    } else {
      currentFilters = currentFilters.filter(
        (item) => item !== data.ID.toString(),
      );
    }

    const newQuery = currentFilters.join(',');

    // Validate before updating state
    if (selectId === 'sources' && params.searchString && !newQuery) {
      infoToast('At least one source is required when searching.', {
        autoClose: 10_000,
        closeButton: false,
        position: 'top-center',
      });
      return;
    }

    // Now safe to update state
    setSelected(checked);

    // Apply filter changes
    if (selectId === 'sources') {
      actions?.setParams('sources', newQuery);
    } else if (selectId === 'categories') {
      actions?.setParams('categories', newQuery);
    } else if (selectId === 'excludeCategories') {
      actions?.setParams('excludeCategories', newQuery);
    }
  };

  return (
    <div className="flex cursor-pointer items-center gap-4 px-6 py-3 text-white last:pb-5">
      <input
        id={`${selectId}-${data.ID}-checkbox`}
        type="checkbox"
        checked={selected}
        disabled={isDisabled}
        onChange={(e) => changeHandler(e.target.checked)}
        className={clsx(
          'peer/item',
          selectId === 'sources'
            ? '!hidden'
            : 'h-4 w-4 appearance-none rounded-xs border border-neutral-600 checked:appearance-auto',
        )}
      />
      <label
        htmlFor={`${selectId}-${data.ID}-checkbox`}
        className={clsx(
          'line-clamp-1 flex w-full cursor-pointer items-center gap-4 select-none peer-disabled/item:opacity-20',
          selectId === 'sources'
            ? 'peer-checked/item:text-primary-400 text-xl peer-checked/item:font-semibold'
            : 'text-lg',
        )}
      >
        {selectId === 'sources' && (
          <Image
            className="rounded-sm"
            src={data.IMAGE_URL || '/svgs/logo/logo.svg'}
            width={30}
            height={30}
            alt={data.NAME}
          />
        )}

        {data.NAME}
      </label>
    </div>
  );
};
export default SelectOption;
