// 📌 Directives
'use client';

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
import {
  useRotatingIndex,
  lastChildClassName,
  otherChildrenClassNameGenerator,
  propertiesParentClassName,
} from './local';

// 🧾 Local types
interface PropsT {
  visibleIndex: 0 | 1;
}

// ⚙️ Functional component
const ExchangeDataUi: React.FC<PropsT> = ({ visibleIndex }) => {
  const firstActiveChild = useRotatingIndex<1 | 2 | 3>(1, 3);
  const secondActiveChild = useRotatingIndex<4 | 5 | 6>(4, 6, 10_000, 5_000);

  return (
    <section className="bg-background relative mt-32 w-full md:py-4">
      {/* Radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_oklch(31.819%_0.08527_252.525_/_30%)_0%,_transparent_95%)]"></div>

      {/* Content */}
      <div
        className={`${containerDefault} relative h-24 overflow-hidden transition-transform duration-700`}
      >
        <div
          className={clsx(
            propertiesParentClassName,
            visibleIndex === 0 ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className={otherChildrenClassNameGenerator(1, firstActiveChild)}>
            <Headset size={24} />
            <span className="mb-1">24/7 support</span>
          </div>
          <div className={otherChildrenClassNameGenerator(2, firstActiveChild)}>
            <ShieldCheck size={24} />
            <span className="mb-1">High security</span>
          </div>
          <div className={otherChildrenClassNameGenerator(3, firstActiveChild)}>
            <Users size={24} />
            <span className="mb-1">+5 million users</span>
          </div>
          <div className={lastChildClassName}>
            <BanknoteArrowDown size={24} />
            <span className="mb-1">No fee</span>
          </div>
        </div>

        <div
          className={clsx(
            propertiesParentClassName,
            visibleIndex === 1 ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div
            className={otherChildrenClassNameGenerator(4, secondActiveChild)}
          >
            <Wrench size={24} />
            <span className="mb-1">Advanced tools</span>
          </div>
          <div
            className={otherChildrenClassNameGenerator(5, secondActiveChild)}
          >
            <BanknoteArrowDown size={24} />
            <span className="mb-1">Instant Deposit</span>
          </div>
          <div
            className={otherChildrenClassNameGenerator(6, secondActiveChild)}
          >
            <BanknoteArrowUp size={24} />
            <span className="mb-1">Instant withdrawal</span>
          </div>
          <div className={lastChildClassName}>
            <Fingerprint size={24} />
            <span className="mb-1">ID-bearing deposit</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ExchangeDataUi;
