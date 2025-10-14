// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState, use, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import type { SelectIDsT } from './local';
import { NewsContext } from '../NewsPage.context';
import Sources from './Sources';
import Categories from './Categories';

// ⚙️ Functional component
const FiltersWrapper = () => {
  const { actions, params } = use(NewsContext);
  const [openSelect, setOpenSelect] = useState<SelectIDsT>(null);

  const closeHandler = (id: SelectIDsT) => {
    if (openSelect === id) setOpenSelect(null);
  };
  const openHandler = (id: SelectIDsT) => {
    if (openSelect !== id) setOpenSelect(id);
  };

  const resetFiltersHandler = () => {
    if (actions) {
      actions.setSourcesParam('');
      actions.setCategoriesParam('');
      actions.setExcludeCategoriesParam('');
      setOpenSelect(null);
    }
  };

  return (
    <div className="grid h-full w-4/6 grid-cols-11 gap-x-4">
      {/* Filters select */}
      <>
        <Sources
          openSelect={openSelect}
          openHandler={openHandler}
          closeHandler={closeHandler}
        />
        <Categories
          openSelect={openSelect}
          openHandler={openHandler}
          closeHandler={closeHandler}
        />
      </>

      {/* Reset filters buttons */}
      <div className="col-span-2 justify-end">
        <Button
          size={'lg'}
          type="button"
          variant={'outline'}
          className="hover:!bg-status-error-200 w-full rounded-sm transition-all hover:cursor-pointer"
          onClick={resetFiltersHandler}
          disabled={
            !params.categories && !params.sources && !params.excludeCategories
          }
        >
          <span>Reset Filters</span>
          <X size={20} strokeWidth={2.5} color="#fff" className="mt-0.5" />
        </Button>
      </div>
    </div>
  );
};
export default FiltersWrapper;
