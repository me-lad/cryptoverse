// Packages imports
import { redirect } from "next/navigation";

// Local imports
import type { ResetPasswordFormStepType } from "~types/form";
import { resetPassword } from "@/lib/actions/auth/reset-password.controller";
import { FormTypes } from "~constants/forms";
import { connectToDB } from "@/lib/configs/mongoose";
import { OtpService } from "~services/otp.service";
import { UserService } from "~services/user.service";
import AuthPageWrapper from "@/components/modules/auth-page/AuthPage.wrapper";
import AuthFormContext from "@/components/modules/auth-page/AuthForm.context";
import AuthResetPasswordFormUnit from "@/components/modules/auth-page/AuthResetPasswordForm.unit";
import AuthVerifyFormErrorUnit from "@/components/modules/auth-page/AuthVerifyFormError.unit";

// Local types
type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

// Functional component
export default async function ResetPasswordPage({ searchParams }: PropsType) {
  let { username } = await searchParams;
  let step: ResetPasswordFormStepType = "1";
  let showError = false;

  if (username) {
    // DB connection ensure
    await connectToDB();

    if (typeof username === "object") username = username[0];

    // Find user by username to access the phone number
    const userData = await UserService.getUserDataByIdentifier(username);
    if (!userData) {
      return redirect("/auth/reset-password");
    }

    if (userData.isRestricted) {
      showError = true;
    }

    if (!userData.isVerified) {
      return redirect(`/auth/verify?username=${username}`);
    }

    const validOtpData = await OtpService.getValidOtp(userData.phoneNumber);

    if (!validOtpData) {
      return redirect("/auth/reset-password");
    }

    step = "2";
  }

  return (
    <AuthPageWrapper
      iconPath="/svgs/auth-page/auth-reset-password.svg"
      subtitleText="Enter your account phone number or username for password recovery."
      backButtonVisibility
      backButtonPath="/auth/signin"
    >
      {showError ? (
        <AuthVerifyFormErrorUnit />
      ) : (
        <AuthFormContext
          formType={FormTypes.ResetPassword}
          formAction={resetPassword}
          resetPasswordFormStep={step}
        >
          <AuthResetPasswordFormUnit />

          {/* Hidden username input */}
          <input type="hidden" name="username" value={username} />
        </AuthFormContext>
      )}
    </AuthPageWrapper>
  );
}
