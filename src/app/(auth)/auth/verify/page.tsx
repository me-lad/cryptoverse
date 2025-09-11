// Packages imports
import { redirect } from "next/navigation";

// Local imports
import { connectToDB } from "@/lib/configs/mongoose";
import { verify } from "@/lib/actions/auth/verify.controller";
import { FormTypes } from "~constants/forms";
import { UserService } from "~services/user.service";
import AuthFormContext from "@/components/modules/auth-page/AuthForm.context";
import AuthPageWrapper from "@/components/modules/auth-page/AuthPage.wrapper";
import AuthVerifyFormFn from "@/components/modules/auth-page/AuthVerifyForm.fn";
import AuthVerifyFormErrorUnit from "@/components/modules/auth-page/AuthVerifyFormError.unit";

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
  const userToVerify = await UserService.getUserDataByIdentifier(username);
  if (!userToVerify) return redirect("/auth/signup");

  // 3. Check founded user to be unverified to access verify page
  if (userToVerify.isVerified) return redirect("/auth/signin");

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
        <AuthFormContext formType={FormTypes.Verify} formAction={verify}>
          <AuthVerifyFormFn
            phoneNumber={userToVerify.phoneNumber}
            username={userToVerify.username}
          />
        </AuthFormContext>
      )}
    </AuthPageWrapper>
  );
}
