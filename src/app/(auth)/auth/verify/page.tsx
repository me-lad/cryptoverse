// Packages imports
import { redirect } from "next/navigation";

// Local imports
import { connectToDB } from "@/lib/configs/mongoose";
import { verify } from "@/lib/actions/auth/verify.controller";
import { AuthFormTypes } from "@/lib/types";
import { daysToMinutes, isDatePassedTime } from "@/lib/helpers";
import AuthFormContext from "@/components/modules/auth-page/AuthForm.context";
import AuthPageWrapper from "@/components/modules/auth-page/AuthPage.wrapper";
import AuthVerifyFormFn from "@/components/modules/auth-page/AuthVerifyForm.fn";
import AuthVerifyFormErrorUnit from "@/components/modules/auth-page/AuthVerifyFormError.unit";
import RedirectClient from "@/components/modules/global/RedirectClient";
import UserService from "@/lib/services/UserService";

// Local types
type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

// Functional component
export default async function VerifyPage({ searchParams }: PropsType) {
  let { username } = await searchParams;

  // 1. Check username existence as search param
  if (!username) return redirect("/auth/signup");
  if (typeof username === "object") username = username[0];

  // 2. Check user account existence with given username
  await connectToDB();
  const userToVerify = await UserService.getUserData(username);
  if (!userToVerify) return redirect("/auth/signup");

  // 3. Check founded user to be unverified to access verify page
  let isClientRedirectNeed = false;
  if (userToVerify.isVerified) {
    if (!userToVerify.refreshTokenExpiresAt) return redirect("/auth/signin");

    const isRefreshTokenExpired = isDatePassedTime(
      userToVerify.refreshTokenExpiresAt,
      daysToMinutes(14),
    );
    if (isRefreshTokenExpired) return redirect("/auth/signin");

    // @ts-expect-error
    const isNotRecentlyUpdated = isDatePassedTime(userToVerify.updatedAt, 1);
    if (isNotRecentlyUpdated) return redirect("/dashboard");

    isClientRedirectNeed = true;
  }

  return (
    <AuthPageWrapper
      subtitleText="We've sent a 6-digit confirmation code to your phone number. Please enter the code in the box below to complete your verification."
      iconPath="/svgs/auth-page/auth-verify-otp.svg"
      backButtonVisibility
      backButtonPath="/auth/signup"
    >
      {userToVerify.isRestricted ? (
        <AuthVerifyFormErrorUnit />
      ) : (
        <AuthFormContext formType={AuthFormTypes.Verify} formAction={verify}>
          {isClientRedirectNeed ? (
            <RedirectClient path="/auth/dashboard" delay={10000} />
          ) : (
            <AuthVerifyFormFn
              phoneNumber={userToVerify.phoneNumber}
              username={userToVerify.username}
            />
          )}
        </AuthFormContext>
      )}
    </AuthPageWrapper>
  );
}
