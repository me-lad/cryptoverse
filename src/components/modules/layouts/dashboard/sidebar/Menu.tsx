// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ScrollArea } from '~core/ui/shadcn/scroll-area';

// 📦 Internal imports
import Signout from './signout';
import HeadingLogo from './heading-logo';
import MenuGroups from './menu-groups';

// ⚙️ Functional component
const SidebarMenu = () => {
  return (
    <ScrollArea className="*:!overflow-x-visible [&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <HeadingLogo />

        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 py-10 lg:min-h-[calc(100vh-58px-67px)]">
          <MenuGroups />
        </ul>

        <div className="border-t border-neutral-400 pt-3.5 dark:border-neutral-700">
          <Signout />
        </div>
      </nav>
    </ScrollArea>
  );
};
export default SidebarMenu;
