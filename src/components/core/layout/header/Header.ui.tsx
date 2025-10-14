// 📦 Third-Party imports
import Image from 'next/image';
import Link from 'next/link';

// 📦 Internal imports
import { flexBetween, containerDefault } from '~styles/tw-custom';
import { NavLink } from '~core/global/NavLink';
import HeaderSearchFn from './HeaderSearch.fn';
import HeaderAccountFn from './HeaderAccount.fn';
import Currency from './Currency';

// ⚙️ Functional component
export default function HeaderUi() {
  return (
    <header className="border-b py-3">
      <div className={`${flexBetween} ${containerDefault}`}>
        {/* Logo & Navbar */}
        <div className="flex items-center gap-8">
          {/* Logo-Text */}
          <div>
            <Link href={'/'}>
              <Image
                src="/svgs/logo/logo-text.svg"
                alt="Coin Verse"
                width={204}
                height={43}
              />
            </Link>
          </div>
          {/* Navbar */}
          <div>
            <nav>
              <ul className="flex items-center gap-8 pt-1">
                {['coins', 'support', 'news'].map((item, index) => (
                  <li className="text-lg text-neutral-300" key={index}>
                    <NavLink
                      activeClassName="text-primary-400 font-semibold"
                      href={`/${item}`}
                    >{`${item.slice(0, 1).toUpperCase()}${item.slice(1)}`}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Search & Account center */}
        <div className="flex items-center gap-6">
          {/* Search button & Search modal */}
          <HeaderSearchFn />

          {/* Currency handler */}
          <Currency />

          {/* Account center */}
          <HeaderAccountFn />
        </div>
      </div>
    </header>
  );
}
