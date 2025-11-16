// 📦 Third-Party imports
import { redirect } from 'next/navigation';

// 📦 Internal imports
import { AuthServices } from '~services/repositories/auth';
import RenewSession from './RenewSession';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
export const AuthAccessControl: React.FC<PropsT> = async ({ children }) => {
  const { isAuthenticated } = await AuthServices.verifyAccessSession();

  if (isAuthenticated) return redirect('/dashboard');

  const { isAllowed, userId } = await AuthServices.verifyRefreshSession();
  if (isAllowed) {
    // Create new sessions
    return <RenewSession userId={userId} />;
  }

  return children;
};
