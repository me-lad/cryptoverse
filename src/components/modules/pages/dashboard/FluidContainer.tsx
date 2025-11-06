// 📦 Third-Party imports
import React from 'react';
import { cn } from '~utils/shadcn';
import FluidContainerToggler from './FluidContainerToggler';

// 🧾 Local types
interface PropsT extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  condense_title: string;
}

// ⚙️ Functional component
const FluidContainer: React.FC<PropsT> = ({
  children,
  condense_title,
  className,
  ...rest
}) => {
  return (
    <div
      data-expand="true"
      className={cn(
        'bg-background relative z-[3] w-full rounded-sm p-4 transition-all',
        'data-[expand=false]:max-h-[3.75rem] data-[expand=false]:*:not-first:hidden',
        className,
      )}
      {...rest}
    >
      <FluidContainerToggler title={condense_title} />

      <div className="*:first:select-none">{children}</div>
    </div>
  );
};
export default FluidContainer;
