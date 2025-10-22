// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { cn } from '~utils/shadcn';

// 🧾 Local types
interface PropsT extends React.ComponentProps<'button'> {
  label: string;
  isOpen: boolean;
}

// ⚙️ Functional component
const SelectButton: React.FC<PropsT> = (props) => {
  const { label, isOpen, ...rest } = props;

  return (
    <Button
      className={cn(
        'w-full rounded-sm font-medium transition-all hover:cursor-pointer',
        props.className,
        isOpen && '!bg-primary',
      )}
      type="button"
      size="lg"
      variant="outline"
      {...rest}
    >
      <span>{label}</span>
      <ChevronDown
        size={16}
        strokeWidth={2.5}
        className={clsx(
          'mt-1 transition-all duration-300',
          isOpen && 'rotate-180',
        )}
      />
    </Button>
  );
};
export default SelectButton;
