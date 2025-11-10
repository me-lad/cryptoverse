// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import { flexCenter, posCenter } from '~styles/tw-custom';

// ⚙️ Functional component
export default function The_404() {
  return (
    <div className="relative h-full w-full">
      <div
        className={`${posCenter} flex h-fit w-full flex-col items-center px-5 lg:w-1/2`}
      >
        <div>
          <Image
            className="scale-75 md:scale-90 lg:scale-100"
            src={'/images/404/404.png'}
            alt="Not Found"
            width={513}
            height={180}
          />
        </div>
        <div>
          <h2 className="mt-8 text-2xl font-semibold text-white md:text-4xl">
            Sorry, page not found !
          </h2>
        </div>
        <div>
          <p className="mx-auto mt-4 max-w-4/5 text-center text-base leading-snug font-medium tracking-wide text-gray-400 md:text-lg lg:max-w-full">
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL. Be sure to check your spelling.
          </p>
        </div>
        <div className="mt-6 sm:mt-12">
          <Button
            variant="default"
            className="scale-90 text-white sm:scale-100"
            size="lg"
          >
            <Link className={`${flexCenter} h-full w-full`} href={'/'}>
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
