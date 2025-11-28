// 📌 Directives
'use client';

// 📦 Third-Party imports
import { BellDot } from 'lucide-react';

// 📦 Internal imports
import { flexBetween, flexCenter } from '~styles/tw-custom';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// ⚙️ Functional component
const Notifications = () => {
  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger>
        <BellDot className="hover:cursor-pointer" size={22} />
      </DropDownTrigger>
      <DropDownMenu className="mt-7 w-88 p-5 max-[37.5em]:-left-32 max-[27.5em]:fixed max-[27.5em]:top-10 max-[27.5em]:right-0 max-[27.5em]:left-0 max-[27.5em]:mx-auto max-[27.5em]:w-[90vw] max-[27.5em]:translate-x-0 lg:-left-28 xl:-left-20 2xl:left-1/2">
        <div className={flexBetween}>
          <p>3 New Notifications</p>
          <p className="hover:text-primary-400 cursor-pointer transition-all">
            Read All
          </p>
        </div>
        <div className="mt-5 *:not-first:mt-5 *:not-last:border-b *:not-last:pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary mt-1 h-3 w-3 rounded-full"></span>
              <h4 className="font-semibold">Transaction Confirmed</h4>
            </div>
            <p className="mt-2 line-clamp-1 text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              ipsa dolorum accusantium, itaque accusamus, provident sed deserunt
              pariatur natus sapiente doloremque reiciendis, eveniet quos quidem
              mollitia tenetur temporibus et totam.
            </p>
            <p className="mt-2 text-sm opacity-90">08-31 20:45</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary mt-1 h-3 w-3 rounded-full"></span>
              <h4 className="font-semibold">Transaction Confirmed</h4>
            </div>
            <p className="mt-2 line-clamp-1 text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              ipsa dolorum accusantium, itaque accusamus, provident sed deserunt
              pariatur natus sapiente doloremque reiciendis, eveniet quos quidem
              mollitia tenetur temporibus et totam.
            </p>
            <p className="mt-2 text-sm opacity-90">08-31 20:45</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary mt-1 h-3 w-3 rounded-full"></span>
              <h4 className="font-semibold">Transaction Confirmed</h4>
            </div>
            <p className="mt-2 line-clamp-1 text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              ipsa dolorum accusantium, itaque accusamus, provident sed deserunt
              pariatur natus sapiente doloremque reiciendis, eveniet quos quidem
              mollitia tenetur temporibus et totam.
            </p>
            <p className="mt-2 text-sm opacity-90">08-31 20:45</p>
          </div>
        </div>
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default Notifications;
