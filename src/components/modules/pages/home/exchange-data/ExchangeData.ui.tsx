// 📦 Third-Party imports
import React from 'react';
import clsx from 'clsx';
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Fingerprint,
  Headset,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';

// 📦 Internal imports
import { containerDefault, flexCenter } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  visibleIndex: 0 | 1;
}

// ⚙️ Functional component
const ExchangeDataUi: React.FC<PropsT> = ({ visibleIndex }) => {
  return (
    <section className="bg-background relative mt-32 w-full py-4">
      {/* Radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_oklch(31.819%_0.08527_252.525_/_30%)_0%,_transparent_95%)]"></div>

      {/* Content */}
      <div
        className={clsx(
          containerDefault,
          'relative h-24 overflow-hidden transition-transform duration-700',
        )}
      >
        <div
          className={clsx(
            'absolute inset-0 flex items-center text-2xl font-semibold transition-transform duration-700',
            visibleIndex === 0 ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <Headset />
            <span className="mb-1">24/7 support</span>
          </div>
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <ShieldCheck />
            <span className="mb-1">High security</span>
          </div>
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <Users />
            <span className="mb-1">+5 million users</span>
          </div>
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <BanknoteArrowDown />
            <span className="mb-1">No fee</span>
          </div>
        </div>

        <div
          className={clsx(
            'absolute inset-0 flex items-center text-2xl font-semibold transition-transform duration-700',
            visibleIndex === 1 ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <Wrench />
            <span className="mb-1">Advanced tools</span>
          </div>
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <BanknoteArrowUp />
            <span className="mb-1">Instant Deposit</span>
          </div>
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <BanknoteArrowDown />
            <span className="mb-1">Instant withdrawal</span>
          </div>
          <div className={`w-1/4 ${flexCenter} gap-2`}>
            <Fingerprint />
            <span className="mb-1">ID-bearing deposit</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ExchangeDataUi;
