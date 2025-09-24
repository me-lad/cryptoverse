// 📌 Directives
import 'server-only';

// 📦 Internal imports
import type { UserModelType } from '~models/User/types';
import type { FormStateT } from '~types/form';
import { AuthMessages } from '~constants/messages';
import { connectToDB } from '~configs/mongoose';
import { catchErrorFormState, FormStatusKinds } from '~constants/form';
import { UserServices } from '~services/user';
import { doHash } from '~helpers/hash';

const signupUser = async (
  username: string,
  phoneNumber: string,
  password: string,
): Promise<FormStateT> => {
  try {
    await connectToDB();

    // 1. Hash password
    const hashedPassword = await doHash(password);

    // 2. Determine user role based on collection length
    const usersCollectionLength = await UserServices.countUsers();
    const isFirstUser = usersCollectionLength === 0;

    // 3. Prepare user data
    const userData: UserModelType = {
      username,
      phoneNumber,
      password: hashedPassword,
      isVerified: isFirstUser,
      isRestricted: false,
      role: isFirstUser ? 'Admin' : 'User',
    };

    // 4. Create user in DB
    const createdUser = await UserServices.createUser(userData);

    // 5. Return appropriate result
    return {
      status: FormStatusKinds.Success,
      toastNeed: true,
      toastMessage: AuthMessages.Success.CompleteSignup,
      redirectNeed: true,
      redirectPath: createdUser.isVerified
        ? '/auth/signin'
        : `/auth/verify?username=${createdUser.username}`,
    };
  } catch (err) {
    console.log('Error in Signup handler', err);
    return catchErrorFormState;
  }
};

export const SignupService = {
  signupUser,
} as const;
