// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ScrollArea } from '~core/ui/shadcn/scroll-area';

// 📦 Internal imports
import { DashboardSidebarContext } from '../Dashboard.context';
import Signout from './Signout';
import UserData from './UserData';
import HeadingLogo from './HeadingLogo';

// ⚙️ Functional component
const SidebarMenu = () => {
  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          <li className="flex w-full items-end gap-2.5">
            <HeadingLogo />
          </li>

          <li className="flex w-full items-end gap-2.5">
            <UserData />
          </li>

          <li className="flex w-full grow items-end">
            <Signout />
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
};
export default SidebarMenu;
