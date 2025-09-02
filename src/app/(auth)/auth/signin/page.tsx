// Packages imports
import Link from "next/link";

// Local imports
import { signinFormFields } from "@/lib/constants";
import { signin } from "@/lib/actions/auth/signin.controller";
import { AuthFormTypes } from "@/lib/types";
import AuthPageWrapper from "@/components/modules/auth-page/AuthPage.wrapper";
import AuthFormContext from "@/components/modules/auth-page/AuthForm.context";
import AuthFormUnit from "@/components/modules/auth-page/AuthForm.unit";

// Functional component
export default function SigninPage() {
  return (
    <AuthPageWrapper
      iconPath="/svgs/logo/logo.svg"
      subtitleText="Sign in to your account throw the bottom form"
    >
      <AuthFormContext formType={AuthFormTypes.Signin} formAction={signin}>
        <AuthFormUnit
          submitButtonText="Sign in"
          formType={AuthFormTypes.Signin}
          formFields={signinFormFields}
        />

        {/* Signup page link */}
        <p className="mt-4 text-center">
          Don't have an account ?
          <Link className="text-primary ml-2 font-medium" href={"/auth/signup"}>
            Sign up
          </Link>
        </p>
      </AuthFormContext>
    </AuthPageWrapper>
  );
}
