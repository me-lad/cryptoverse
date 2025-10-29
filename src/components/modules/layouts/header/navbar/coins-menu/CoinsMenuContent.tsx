// 📦 Third-Party imports
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import { coinsNavItems, type CoinNavItemT } from '../local';
import CoinsData from './CoinsData';

// ⚙️ Functional components
const ListItem = ({ icon, label, url, shortName }: CoinNavItemT) => {
  return (
    <li className="mt-2.5 w-full last:mb-2.5">
      <Button
        className="w-full cursor-pointer justify-start gap-4 !py-6 !text-base"
        variant={'ghost'}
      >
        <Image
          src={icon}
          width={25}
          height={25}
          alt={label}
          className="rounded-xs"
        />
        <Link className="w-full text-start" href={url}>
          {label}

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

const CoinsMenuContent = () => {
  return (
    <div className="w-max">
      <ul className="grid grid-cols-2">
        {coinsNavItems.map((item) => (
          <ListItem key={item.url} {...item} />
        ))}
      </ul>

      <CoinsData />
    </div>
  );
};
export default CoinsMenuContent;
