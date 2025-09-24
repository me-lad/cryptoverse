// 📦 Internal imports
import { AuthAccessControl } from '~core/global/access-controls';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
export default function AuthLayout({ children }: PropsT) {
  return <AuthAccessControl>{children}</AuthAccessControl>;
}
