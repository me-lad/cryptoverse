// 📦 Third-Party imports
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '~core/ui/shadcn/navigation-menu';

// 📦 Internal imports
import { NavLink } from '~core/global/NavLink';
import NewsMenuContent from './news-menu/NewsMenuContent';
import CoinsMenuContent from './coins-menu/CoinsMenuContent';

// ⚙️ Functional component
const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap">
        {/* Coins */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="!h-fit min-w-[6.5rem] cursor-pointer gap-1 rounded-sm bg-transparent !p-2 text-lg font-normal !text-neutral-300 *:mt-1 *:!fill-neutral-300 *:stroke-3">
            Coins
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CoinsMenuContent />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* News */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="!h-fit min-w-[6.5rem] cursor-pointer gap-1 rounded-sm bg-transparent !p-2 text-lg font-normal !text-neutral-300 *:mt-1 *:!fill-neutral-300 *:stroke-3">
            News
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NewsMenuContent />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Support */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className="!h-fit min-w-[6.5rem] cursor-pointer rounded-sm !p-2 text-lg font-normal !text-neutral-300 *:mt-1 *:!fill-neutral-300 *:stroke-3"
            asChild
          >
            <NavLink
              className="text-center text-lg text-neutral-300"
              href="/support"
              activeClassName="!text-primary-400"
            >
              Support
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Navbar;
