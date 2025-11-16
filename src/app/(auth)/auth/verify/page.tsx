// 📦 Third-Party imports
import React from 'react';
import { redirect } from 'next/navigation';

// 📦 Internal imports
import { connectToDB } from '~vendors/mongoose';
import { verify } from '~actions/auth/verify.controller';
import { FormKinds } from '~constants/form';
import { UserServices } from '~services/user';
import AuthFormContext from '@/components/modules/pages/auth/AuthForm.context';
import AuthPageWrapper from '@/components/modules/pages/auth/AuthPage.wrapper';
import VerifyFormFn from '@/components/modules/pages/auth/form-containers/VerifyForm.fn';
import AuthVerifyFormErrorUnit from '@/components/modules/pages/auth/form-parts/VerifyFormError';

// 🧾 Local types
type PropsT = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

// ⚙️ Functional component
const VerifyPage: React.FC<PropsT> = async ({ searchParams }) => {
  let { username } = await searchParams;

  // 1. Check username existence as search param
  if (!username) return redirect('/auth/signup');
  if (typeof username === 'object') username = username[0];

  // 2. Check user account existence with given username
  await connectToDB();
  const userToVerify = await UserServices.getUserDataByIdentifier(username);
  if (!userToVerify) return redirect('/auth/signup');

  // 3. Check founded user to be unverified to access verify page
  if (userToVerify.isVerified) return redirect('/auth/signin');

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
        <AuthFormContext formType={FormKinds.Verify} formAction={verify}>
          <VerifyFormFn
            phoneNumber={userToVerify.phoneNumber}
            username={userToVerify.username}
          />
        </AuthFormContext>
      )}
    </AuthPageWrapper>
  );
};
export default VerifyPage;
