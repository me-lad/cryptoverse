// 📦 Third-Party imports
import Link from 'next/link';

// 📦 Internal imports
import { FormKinds, signupFormFields } from '~constants/form';
import { signup } from '~actions/auth/signup.controller';
import AuthPageWrapper from '@/components/modules/pages/auth/AuthPage.wrapper';
import AuthFormContext from '@/components/modules/pages/auth/AuthForm.context';
import Form from '@/components/modules/pages/auth/form-containers/Form';

// ⚙️ Functional component
const SignupPage = () => {
  return (
    <AuthPageWrapper
      iconPath="/svgs/logo/logo.svg"
      subtitleText="Please enter required data to create your account"
    >
      <AuthFormContext formType={FormKinds.Signup} formAction={signup}>
        <Form formFields={signupFormFields} submitButtonText="Sign up" />

        {/* Signin page link */}
        <p className="mt-4 text-center">
          Already have an account ?
          <Link className="text-primary ml-2 font-medium" href={'/auth/signin'}>
            Sign in
          </Link>
        </p>
      </AuthFormContext>
    </AuthPageWrapper>
  );
};
export default SignupPage;
