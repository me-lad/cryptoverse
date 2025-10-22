// 📦 Third-Party imports
import Link from 'next/link';

// 📦 Internal imports
import { signinFormFields } from '~constants/form';
import { signin } from '~actions/auth/signin.controller';
import { FormKinds } from '~constants/form';
import AuthPageWrapper from '@/components/modules/pages/auth/AuthPage.wrapper';
import AuthFormContext from '@/components/modules/pages/auth/AuthForm.context';
import Form from '@/components/modules/pages/auth/form-containers/Form';

// ⚙️ Functional component
const SigninPage = () => {
  return (
    <AuthPageWrapper
      iconPath="/svgs/logo/logo.svg"
      subtitleText="Sign in to your account throw the bottom form"
    >
      <AuthFormContext formType={FormKinds.Signin} formAction={signin}>
        <Form
          submitButtonText="Sign in"
          formType={FormKinds.Signin}
          formFields={signinFormFields}
        />

        {/* Signup page link */}
        <p className="mt-4 text-center">
          Don't have an account ?
          <Link className="text-primary ml-2 font-medium" href={'/auth/signup'}>
            Sign up
          </Link>
        </p>
      </AuthFormContext>
    </AuthPageWrapper>
  );
};
export default SigninPage;
