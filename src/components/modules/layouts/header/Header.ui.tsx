// 📦 Internal imports
import { flexBetween, containerDefault } from '~styles/tw-custom';
import GlobalSearch from './search';
import HeaderAccountFn from './account-center/HeaderAccount.fn';
import Currency from './currency';
import Logo from './logo';
import NavbarContext from './navbar/Navbar.context';
import Navbar from './navbar';
import HamburgerMenu from './hamburger-menu';

// ⚙️ Functional component
export default function HeaderUi() {
  return (
    <header className="border-b py-3">
      <div
        className={`${flexBetween} ${containerDefault} min-[37.5em]:flex-col min-[37.5em]:gap-y-5 lg:flex-row lg:gap-y-0`}
      >
        {/* Logo & Navbar */}
        <div className="hidden items-center gap-8 min-[37.5em]:flex">
          <Logo />
          <NavbarContext>
            <Navbar />
          </NavbarContext>
        </div>

        {/* Hamburger menu (Mobile) */}
        <div className="min-[37.5em]:hidden">
          <HamburgerMenu />
        </div>

        {/* Search & Account center */}
        <div className="flex items-center gap-4">
          {/* <div className="max-[37.5em]:hidden"> */}
          <GlobalSearch />
          {/* </div> */}
          <div className="max-[37.5em]:hidden">
            <Currency />
          </div>
          <HeaderAccountFn />
        </div>
      </div>
    </header>
  );
}
