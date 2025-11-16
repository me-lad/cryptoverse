// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import type { CoinNavItemT } from '../local.types';
import clsx from 'clsx';

// ⚙️ Functional component

const ListLinkItem = ({ icon, label, url, shortName }: CoinNavItemT) => {
  const pathname = usePathname();

  return (
    <li className="mt-2.5 w-full last:mb-2.5">
      <Button
        className={clsx(
          'w-full cursor-pointer justify-start gap-4 !py-6 !text-base',
          pathname === url && '*:*:line-through',
        )}
        variant={'ghost'}
        disabled={url === pathname}
      >
        <Image
          src={icon}
          width={25}
          height={25}
          alt={label}
          className="rounded-xs"
        />
        <Link className="w-full text-start" href={url === pathname ? '/' : url}>
          <span>{label}</span>

          {!!shortName && (
            <span className="ml-2.5 !text-xs text-neutral-500">
              {shortName}
            </span>
          )}
        </Link>
      </Button>
    </li>
  );
};

export default ListLinkItem;
