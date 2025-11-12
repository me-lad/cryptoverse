// 📦 Third-Party imports
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import { minutesToMillisecond } from '~helpers/time';
import { getTradingViewAvailableSymbols } from '~services/coins';

// ⚙️ Custom hooks
export const useSymbols = (startPoint: number, searchQuery: string) => {
  return useQuery({
    queryKey: ['tw-symbols', startPoint, searchQuery],
    queryFn: () => getTradingViewAvailableSymbols(startPoint, searchQuery),
    staleTime: minutesToMillisecond(60),
    gcTime: minutesToMillisecond(120),
  });
};

// ⚙️ Functional components
export const Heading = () => {
  return (
    <div className={`${flexCenter} mt-5`}>
      <Link href={'/'}>
        <Image
          src={'/svgs/logo/logo-text.svg'}
          width={180}
          height={60}
          alt="Crypto Verse"
        />
      </Link>
    </div>
  );
};

export const ListHeading = () => {
  return (
    <div className="mx-auto mt-10 grid w-[80%] grid-cols-12 border-b px-4 pb-2.5 text-sm opacity-60">
      <p className="col-span-8">Symbol</p>
      <p className="col-span-4">Source</p>
    </div>
  );
};
