import { connectToDB } from '~vendors/mongoose';
import { AuthServices } from './auth';
import { Messages } from '~constants/messages';
import SessionModel from '~models/Session';
import OtpModel from '~models/Otp';
import UserModel from '~models/User';

export const doSignout = async () => {
  try {
    await connectToDB();

    const { userId: accessReceivedId } =
      await AuthServices.verifyAccessSession();
    const { userId: refreshReceivedId } =
      await AuthServices.verifyRefreshSession();

    if (!accessReceivedId && !refreshReceivedId)
      throw new Error(Messages.Error.CatchHandler);

    const id = accessReceivedId || refreshReceivedId;
    const user = await UserModel.model.findOneAndUpdate(
      { _id: id },
      {
        $unset: {
          sessionId: '',
          refreshToken: '',
          refreshTokenExpiresAt: '',
        },
      },
    );

    await OtpModel.model.deleteMany({ phoneNumber: user?.phoneNumber });
    await SessionModel.model.deleteOne({ userId: id });

    return true;
  } catch (err) {
    console.log(err);
    return;
  }
};
