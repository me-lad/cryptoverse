// 📦 Internal imports
import { cn } from '~utils/shadcn';

// 🧾 Local types
interface PropsT extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

// ⚙️ Functional component
export const CatchError = ({ message, className, ...props }: PropsT) => {
  return (
    <p
      className={cn(
        'text-status-error-200 text-center text-3xl font-bold',
        className,
      )}
      {...props}
    >
      {message ||
        'Something went wrong. Please check your connection and try again.'}
    </p>
  );
};
