// 📦 Third-Party imports
import { redirect } from 'next/navigation';

// 📦 Internal imports
import type { ResetPasswordFormStepT } from '~types/form';
import { resetPassword } from '~actions/auth/reset-password.controller';
import { FormKinds } from '~constants/form';
import { connectToDB } from '~configs/mongoose';
import { OtpServices } from '~services/otp';
import { UserServices } from '~services/user';
import AuthPageWrapper from '@/components/modules/pages/auth/AuthPage.wrapper';
import AuthFormContext from '@/components/modules/pages/auth/AuthForm.context';
import ResetPasswordForm from '@/components/modules/pages/auth/form-containers/ResetPasswordForm';
import AuthVerifyFormErrorUnit from '@/components/modules/pages/auth/form-parts/VerifyFormError';

// 🧾 Local types
type PropsT = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

// ⚙️ Functional component
const ResetPasswordPage: React.FC<PropsT> = async ({ searchParams }) => {
  let { username } = await searchParams;
  let step: ResetPasswordFormStepT = '1';
  let showError = false;

  if (username) {
    // DB connection ensure
    await connectToDB();

    if (typeof username === 'object') username = username[0];

    // Find user by username to access the phone number
    const userData = await UserServices.getUserDataByIdentifier(username);
    if (!userData) {
      return redirect('/auth/reset-password');
    }

    if (userData.isRestricted) {
      showError = true;
    }

    if (!userData.isVerified) {
      return redirect(`/auth/verify?username=${username}`);
    }

    const validOtpData = await OtpServices.getValidOtp(userData.phoneNumber);

    if (!validOtpData) {
      return redirect('/auth/reset-password');
    }

    step = '2';
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
          formType={FormKinds.ResetPassword}
          formAction={resetPassword}
          resetPasswordFormStep={step}
        >
          <ResetPasswordForm />

          {/* Hidden username input */}
          <input type="hidden" name="username" value={username} />
        </AuthFormContext>
      )}
    </AuthPageWrapper>
  );
};
export default ResetPasswordPage;
