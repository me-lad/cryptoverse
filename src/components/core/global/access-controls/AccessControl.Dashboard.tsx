// 📦 Third-Party imports
import { redirect } from 'next/navigation';

// 📦 Internal imports
import { AuthServices } from '~services/auth';
import RenewSession from './RenewSession';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}
// ⚙️ Functional component
export const DashboardAccessControl: React.FC<PropsT> = async ({
  children,
}) => {
  const { isAuthenticated } = await AuthServices.verifyAccessSession();

  if (!isAuthenticated) {
    const { isAllowed, userId } = await AuthServices.verifyRefreshSession();
    if (!isAllowed) return redirect('/auth/signin');

    // Create new sessions
    return <RenewSession userId={userId} />;
  }

  return children;
};
