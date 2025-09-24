// 📦 Internal imports
import { cn } from '~utils/shadcn';

// 🧾 Local types
interface PropsT extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string | React.ReactNode;
}

// ⚙️ Functional component
export const CustomTitle = ({ text, className, ...props }: PropsT) => {
  return (
    <h3
      className={cn('mt-1 text-center text-4xl font-semibold', className)}
      {...props}
    >
      {text}
    </h3>
  );
};
