// 📌 Directives
'use client';

// 📦 Third-Party imports
import clsx from 'clsx';
import { use } from 'react';

// 📦 Internal imports
import { dashboardSidebarMenuGroups } from '~constants/dashboard';
import { DashboardSidebarContext } from '../../Dashboard.context';
import Title from './Title';
import SimpleItem from './SimpleItem';
import AccordionItem from './AccordionItem';

// ⚙️ Functional component
const MenuGroups = () => {
  const { getters } = use(DashboardSidebarContext);

  return (
    <>
      {dashboardSidebarMenuGroups.map((group) => (
        <li
          className={clsx(
            'flex w-full flex-col justify-end gap-2.5 not-first:mt-8',
            !getters?.getOpenState() && 'items-center',
          )}
          key={group.title}
        >
          <Title title={group.title} />

          <div>
            {group.items.map((item) => (
              <div key={item.title} className="flex">
                {item.url || !getters?.getOpenState() ? (
                  <SimpleItem {...item} />
                ) : (
                  <AccordionItem {...item} />
                )}
              </div>
            ))}
          </div>
        </li>
      ))}
    </>
  );
};
export default MenuGroups;
