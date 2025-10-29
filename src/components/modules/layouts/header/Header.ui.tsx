// 📦 Internal imports
import { flexBetween, containerDefault } from '~styles/tw-custom';
import GlobalSearch from './global-search';
import HeaderAccountFn from './account-center/HeaderAccount.fn';
import Currency from './currency';
import Logo from './logo';
import NavbarContext from './navbar/Navbar.context';
import Navbar from './navbar';

// ⚙️ Functional component
export default function HeaderUi() {
  return (
    <header className="border-b py-3">
      <div className={`${flexBetween} ${containerDefault}`}>
        {/* Logo & Navbar */}
        <div className="flex items-center gap-8">
          <Logo />
          <NavbarContext>
            <Navbar />
          </NavbarContext>
        </div>

        {/* Search & Account center */}
        <div className="flex items-center gap-4">
          <GlobalSearch />
          <Currency />
          <HeaderAccountFn />
        </div>
      </div>
    </header>
  );
}
