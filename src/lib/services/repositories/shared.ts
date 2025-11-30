import { connectToDB } from '~vendors/mongoose';
import { AuthServices } from './auth';
import { Messages } from '~constants/messages';
import SessionModel from '@/lib/models/Session';
import OtpModel from '@/lib/models/Otp';
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
    const user = await UserModel.model.findOne({ id });

    await OtpModel.model.deleteMany({ phoneNumber: user?.phoneNumber });
    await SessionModel.model.deleteOne({ userId: id });
    if (user?.sessionId) user.sessionId = undefined;
    if (user?.refreshToken) user.refreshToken = undefined;
    if (user?.refreshTokenExpiresAt) user.refreshTokenExpiresAt = undefined;
    await user?.save();

    return true;
  } catch (err) {
    console.log(err);
    return;
  }
};
