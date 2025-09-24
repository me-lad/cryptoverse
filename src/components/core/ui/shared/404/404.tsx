// 📌 Directives

// 📦 Third-Party imports
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import { flexCenter, posCenter } from '~styles/tw-custom';
import { Button } from '../../shadcn/button';

// 🧾 Local types

// ⚙️ Functional component
export default function The_404() {
  return (
    <div className="relative h-full w-full">
      <div
        className={clsx(posCenter, 'flex h-fit w-1/2 flex-col items-center')}
      >
        <div>
          <Image
            src={'/images/404/404.png'}
            alt="Not Found"
            width={513}
            height={180}
          />
        </div>
        <div>
          <h2 className="mt-8 text-4xl font-semibold text-white">
            Sorry, page not found !
          </h2>
        </div>
        <div>
          <p className="mt-4 text-center text-lg leading-snug font-medium tracking-wide text-gray-400">
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL. Be sure to check your spelling.
          </p>
        </div>
        <div className="mt-12">
          <Button variant="default" className="text-white" size="lg">
            <Link className={clsx(flexCenter, 'h-full w-full')} href={'/'}>
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
