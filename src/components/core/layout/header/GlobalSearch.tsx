// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, useRef, useState } from 'react';
import { Button } from '~core/ui/shadcn/button';
import { Search } from 'lucide-react';
import { Input } from '~core/ui/shadcn/input';
import { Spinner } from '~core/ui/shadcn/spinner';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// 📦 Internal imports
import { DarkOverlay } from '~core/global/overlays';
import { useDebounce } from '~hooks/useDebounce';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { searchCoins } from '~services/coins';
import { Percentage, Price } from '~core/global/formatters';

// ⚙️ Functional component
export default function GlobalSearch() {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [menuStatus, setMenuStatus] = useState<'open' | 'closed'>('closed');
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuStatus('closed');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handlerMenu = () => {
    if (menuRef.current) {
      if (menuStatus === 'closed') {
        setMenuStatus('open');
      } else {
        setMenuStatus('closed');
      }
    }
  };

  const debouncedSearch = useDebounce(search, 1500);

  const { data, error, isLoading } = useQuery({
    queryKey: ['searchedCoins', debouncedSearch],
    queryFn: () => searchCoins(debouncedSearch),
  });

  useEffect(() => {
    setIsSearching(false);
  }, [debouncedSearch]);

  return (
    <>
      {menuStatus === 'open' && <DarkOverlay />}

      <div ref={menuRef} className="relative z-50">
        {/* Icon */}
        <Button
          className={clsx(
            'relative z-50 hover:cursor-pointer',
            menuStatus === 'open' && '!bg-primary/70',
          )}
          onClick={() => handlerMenu()}
          variant={'secondary'}
        >
          <Search size={16} />
        </Button>

        {/* Menu */}
        <div
          className={clsx(
            'bg-background-lighter !no-scrollbar absolute top-full left-1/2 z-50 mt-7 max-h-96 w-[28rem] -translate-x-1/4 overflow-auto rounded-sm border border-neutral-700 p-5 shadow-2xs shadow-neutral-800 transition-all',
            menuStatus === 'closed'
              ? 'invisible -translate-y-3 opacity-0'
              : 'visible opacity-100',
          )}
        >
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              e.target.value.length >= 2 && setIsSearching(true);
              setSearch(e.target.value);
            }}
            className="focus-visible:border-b-primary rounded-sm !shadow-none !ring-0 !outline-0"
          />

          {!data || !data.length || debouncedSearch.length < 2 ? (
            <div
              className={`${flexCenter} mt-20 mb-[3.75rem] flex-col gap-y-2.5`}
            >
              {isSearching || isLoading ? (
                <Spinner variant="circle" size={40} />
              ) : (
                <>
                  <Image
                    src={'/svgs/header/search-magnifier.svg'}
                    width={65}
                    height={65}
                    alt="search"
                  />
                  <p className="text-lg">No records found</p>
                </>
              )}
            </div>
          ) : (
            <ul>
              {data.map((coin) => (
                <li key={coin.id} className="mt-5">
                  <Link className={flexBetween} href={`/coin/${coin.symbol}`}>
                    <div className="flex w-fit items-center gap-4">
                      <Image
                        src={coin.image}
                        width={30}
                        height={30}
                        alt={coin.name}
                        className="mix-blend-screen"
                      />
                      <div className="w-2/3">
                        <h4 className="text-lg font-semibold">
                          {coin.symbol.toUpperCase()}
                        </h4>
                        <p className="mt-0.5 line-clamp-1 text-sm text-neutral-400">
                          {coin.id.slice(0, 1).toUpperCase() + coin.id.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex w-1/4 flex-col items-start justify-center`}
                    >
                      <div className={`${flexCenter} w-full flex-col`}>
                        <Price
                          title={coin.current_price.toLocaleString()}
                          className="w-full"
                          price={coin.current_price}
                        />
                        <Percentage
                          fontSize="0.7rem"
                          percentage={
                            coin.price_change_percentage_24h_in_currency
                          }
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
