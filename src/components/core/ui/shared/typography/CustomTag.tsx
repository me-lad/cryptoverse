// 📦 Internal imports
import { cn } from '~utils/shadcn';
import { flexCenter } from '~styles/tw-custom';

// 🧾 Local types

interface PropsT extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

// ⚙️ Functional component
export const CustomTag = ({ text, className, ...props }: PropsT) => {
  return (
    <div className={cn(flexCenter, 'gap-3', className)} {...props}>
      <span className="bg-primary mt-0.5 inline-block size-2.5 rounded-full shadow-[0_0_0.5rem_var(--color-primary-200)] sm:size-3.5" />
      <span className="font-medium sm:text-lg">{text}</span>
    </div>
  );
};
