// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, useState } from 'react';
import { Input } from '~core/ui/shadcn/input';
import { Spinner } from '~core/ui/shadcn/spinner';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

// 📦 Internal imports
import type { CoinEntity_Gecko } from '~types/api-generated/shared';
import { useDebounce } from '~hooks/useDebounce';
import { flexBetween, flexCenter } from '~styles/tw-custom';
import { searchCoins } from '~services/integrations/coins';
import { Percentage, Price } from '~core/global/formatters';

// 🧾 Local types
interface PropsT {
  coinEvent?: (coinData: CoinEntity_Gecko) => void;
}

// ⚙️ Functional component
const GlobalSearchMenu: React.FC<PropsT> = ({ coinEvent }) => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          e.target.value.length >= 2 && setIsSearching(true);
          setSearch(e.target.value);
        }}
        className="focus-visible:border-primary rounded-sm !shadow-none !ring-0 !outline-0"
      />

      {!data || !data.length || debouncedSearch.length < 2 || error ? (
        <div className={`${flexCenter} mt-20 mb-[3.75rem] flex-col gap-y-2.5`}>
          {isSearching || isLoading ? (
            <Spinner variant="circle-filled" size={40} />
          ) : (
            <>
              <Image
                src={'/svgs/header/search-magnifier.svg'}
                width={65}
                height={65}
                alt="search"
              />
              <p className="text-lg">
                {debouncedSearch.length < 2
                  ? 'Enter something'
                  : 'No records found'}
              </p>
            </>
          )}
        </div>
      ) : (
        <ul>
          {data.map((coin) => (
            <li key={coin.id} className="mt-5">
              <a className={flexBetween} href={`/coin/${coin.id}`}>
                <div className="min-[27.5emw-fit flex w-full items-center gap-4">
                  <Image
                    src={coin.image}
                    width={30}
                    height={30}
                    alt={coin.name}
                    className="mix-blend-screen"
                  />
                  <div className="max-[27.5em]:grow min-[27.5em]:w-2/3">
                    <h4 className="text-lg font-semibold">
                      {coin.symbol.toUpperCase()}
                    </h4>
                    <p
                      title={coin.id}
                      className="mt-0.5 line-clamp-1 text-sm text-neutral-400"
                    >
                      {coin.id.slice(0, 1).toUpperCase() + coin.id.slice(1)}
                    </p>
                  </div>
                </div>
                <div
                  className={`hidden w-1/4 flex-col items-start justify-center min-[27.5em]:flex`}
                >
                  <div className={`${flexCenter} w-full flex-col`}>
                    <Price className="w-full" price={coin.current_price} />
                    <Percentage
                      fontSize="0.7rem"
                      percentage={coin.price_change_percentage_24h_in_currency}
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default GlobalSearchMenu;
