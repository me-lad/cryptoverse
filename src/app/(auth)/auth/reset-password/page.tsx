// Directives

// Packages imports

// Local imports
import AuthPageWrapper from "@/components/modules/auth-page/AuthPage.wrapper";
import AuthFormContext from "@/components/modules/auth-page/AuthForm.context";
import AuthResetPasswordFormUnit from "@/components/modules/auth-page/AuthResetPasswordForm.unit";
import { resetPassword } from "@/lib/actions/auth/reset-password.controller";
import { AuthFormTypes } from "@/lib/types";

// Local types

// Functional component
export default function ResetPasswordPage() {
  return (
    <AuthPageWrapper
      iconPath="/svgs/auth-page/auth-reset-password.svg"
      subtitleText="Enter your account phone number or username for password recovery."
      backButtonVisibility
      backButtonPath="/auth/signin"
    >
      <AuthFormContext
        formType={AuthFormTypes.ResetPassword}
        formAction={resetPassword}
      >
        <AuthResetPasswordFormUnit />
      </AuthFormContext>
    </AuthPageWrapper>
  );
}
