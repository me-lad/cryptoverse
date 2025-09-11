// Packages imports
import { redirect } from "next/navigation";

// Local imports
import { AuthService } from "~services/auth.service";
import RenewSession from "./RenewSession";

// Local types
interface PropsType {
  children: React.ReactNode;
}
// Functional component
export default async function DashboardAccessControl({ children }: PropsType) {
  const { isAuthenticated } = await AuthService.verifyAccessSession();

  if (!isAuthenticated) {
    const { isAllowed, userId } = await AuthService.verifyRefreshSession();
    if (!isAllowed) return redirect("/auth/signin");

    // Create new sessions
    return <RenewSession userId={userId} />;
  }

  return children;
}
