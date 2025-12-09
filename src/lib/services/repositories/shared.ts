import { connectToDB } from '~vendors/mongoose';
import { AuthServices } from './auth';
import { UserServices } from './user';
import { Messages } from '~constants/messages';
import { getCookie } from '~helpers/cookies';
import { SessionServices } from './session';

export const doSignout = async () => {
  try {
    await connectToDB();

    const { userId: accessReceivedId } =
      await AuthServices.verifyAccessSession();
    const { userId: refreshReceivedId } =
      await AuthServices.verifyRefreshSession();

    if (!accessReceivedId && !refreshReceivedId)
      throw new Error(Messages.Error.CatchHandler);

    const userId = accessReceivedId || refreshReceivedId;
    const deviceId = await getCookie('device_id');

    if (!userId || !deviceId) return null;

    await UserServices.removeSessionFromUserByDevice(userId, deviceId);
    await SessionServices.deleteSession(deviceId);

    return true;
  } catch (err) {
    return;
  }
};
