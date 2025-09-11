// Local imports
import AuthAccessControl from "@/components/modules/global/AccessControl.Auth";

// Local types
interface PropsType {
  children: React.ReactNode;
}

// Functional component
export default function AuthLayout({ children }: PropsType) {
  return <AuthAccessControl>{children}</AuthAccessControl>;
}
