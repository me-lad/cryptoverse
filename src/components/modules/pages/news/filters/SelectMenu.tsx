// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Loader2, Search } from 'lucide-react';
import { Input } from '~core/ui/shadcn/input';
import React, { useEffect, useState, use, useCallback } from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import type { SelectIDsT } from './local';
import { flexCenter } from '~styles/tw-custom';
import { useDebounce } from '~hooks/useDebounce';
import { NewsContext } from '../NewsPage.context';
import { DropDownMenu } from '~core/global/dropdown';
import SelectOption from './SelectOption';

// 🧾 Local types
interface PropsT {
  selectId: SelectIDsT;
  options: any[] | null;
}

// ⚙️ Functional component
const SelectMenu: React.FC<PropsT> = (props) => {
  const { selectId } = props;
  const { params } = use(NewsContext);

  const [options, setOptions] = useState<any[]>(props.options || []);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search.length >= 2) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setOptions(props.options!);
    }
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      setOptions(() => {
        const filteredData = props.options!.filter((item) =>
          item.NAME.toLowerCase().includes(search.toLowerCase()),
        );
        return filteredData || [];
      });
    }

    setIsSearching(false);
  }, [debouncedSearch]);

  const checkFilterStatus = useCallback(
    (keys: [string, string], targetSelectId: SelectIDsT) => {
      const targetSources = !params.searchString
        ? params.sources
        : (params.sources || '5').split(',').slice(-1);
      const list = {
        sources: targetSources || [],
        categories: params.categories?.split(',') || [],
        excludeCategories: params.excludeCategories?.split(',') || [],
      }[targetSelectId!];

      return keys.filter(Boolean).some((key) => list.includes(key));
    },
    [
      params.sources,
      params.categories,
      params.excludeCategories,
      params.searchString,
    ],
  );

  return (
    <DropDownMenu
      className={clsx(
        'left-0 mt-2 max-h-96 w-full translate-x-0 overflow-y-auto sm:w-fit lg:w-max',
      )}
    >
      {/* Search */}
      <div
        className={`${flexCenter} has-focus-visible:border-primary-700 mx-auto my-4 w-11/12 rounded-sm border-2 px-4`}
      >
        {isSearching ? (
          <Loader2
            size={18}
            strokeWidth={2.5}
            className="mt-0.5 animate-spin"
          />
        ) : (
          <Search size={18} strokeWidth={2.5} className="mt-0.5" />
        )}
        <Input
          type="text"
          placeholder={`Search ${selectId === 'sources' ? 'source' : 'category'}`}
          onChange={(e) => setSearch(e.target.value)}
          className="!border-0 !bg-transparent !ring-0 placeholder:text-sm placeholder:text-neutral-300"
        />
      </div>

      {/* Options */}
      {options?.map((opt) => (
        <SelectOption
          key={`${checkFilterStatus(
            [opt.ID.toString(), opt.SOURCE_KEY || opt.NAME],
            selectId,
          )}-${opt.ID}-${opt.NAME}`}
          data={{ ...opt }}
          selectId={selectId!}
          isSelected={checkFilterStatus(
            [opt.ID.toString(), opt.SOURCE_KEY || opt.NAME],
            selectId,
          )}
          isDisabled={
            selectId !== 'sources' &&
            checkFilterStatus(
              [opt.ID.toString(), opt.NAME],
              selectId === 'categories' ? 'excludeCategories' : 'categories',
            )
          }
        />
      ))}
    </DropDownMenu>
  );
};
export default SelectMenu;
