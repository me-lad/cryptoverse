// Packages imports
import Link from "next/link";

// Local imports
import AuthPageWrapper from "@/components/modules/auth-page/AuthPage.wrapper";
import AuthFormContext from "@/components/modules/auth-page/AuthForm.context";
import AuthFormUnit from "@/components/modules/auth-page/AuthForm.unit";
import { signupFormFields } from "@/lib/constants";
import { signup } from "@/lib/actions/auth/signup.controller";
import { AuthFormTypes } from "@/lib/types";

// Functional component
export default function SignupPage() {
  return (
    <AuthPageWrapper
      iconPath="/svgs/logo/logo.svg"
      subtitleText="Please enter required data to create your account"
    >
      <AuthFormContext formType={AuthFormTypes.Signup} formAction={signup}>
        <AuthFormUnit
          formFields={signupFormFields}
          submitButtonText="Sign up"
        />

        {/* Signin page link */}
        <p className="mt-4 text-center">
          Already have an account ?
          <Link className="text-primary ml-2 font-medium" href={"/auth/signin"}>
            Sign in
          </Link>
        </p>
      </AuthFormContext>
    </AuthPageWrapper>
  );
}
