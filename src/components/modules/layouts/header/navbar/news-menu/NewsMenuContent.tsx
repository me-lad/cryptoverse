// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import Link from 'next/link';
import Image from 'next/image';

// 📦 Internal imports
import type { NewsNavItemT } from '../local.types';
import { newsNavItems } from '../local.constants';

// ⚙️ Functional components
const ListItem = ({ icon, label, url }: NewsNavItemT) => {
  return (
    <li className="mt-2.5 w-full last:mb-2.5">
      <Button
        className="w-full cursor-pointer justify-start gap-4 !px-10 !py-6 !text-base"
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
        </Link>
      </Button>
    </li>
  );
};

const NewsMenuContent = () => {
  return (
    <div className="grid w-max grid-cols-2">
      <ul>
        {newsNavItems.languages.map((item) => (
          <ListItem key={item.url} {...item} />
        ))}
      </ul>
      <ul>
        {newsNavItems.coins.map((item) => (
          <ListItem key={item.url} {...item} />
        ))}
      </ul>
    </div>
  );
};
export default NewsMenuContent;
