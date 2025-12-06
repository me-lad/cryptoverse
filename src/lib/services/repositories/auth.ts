// 📌 Directives
import 'server-only';

// Package imports
import { isValidObjectId, Schema } from 'mongoose';

// 📦 Internal imports
import type {
  AccessSessionVerificationResultT,
  RefreshSessionVerificationResultT,
  SessionCreationResultT,
} from '~types/session';
import { daysToMillisecond, hoursToMillisecond } from '~helpers/time';
import { connectToDB } from '~vendors/mongoose';
import { UserServices } from '~services/repositories/user';
import { SessionServices } from '~services/repositories/session';
import { decrypt, encrypt } from '~helpers/token';
import { getAccessTokenSecret, getRefreshTokenSecret } from '~helpers/token';
import { verifyHash } from '~helpers/hash';
import { setCookie, getCookie, getOrCreateDeviceId } from '~helpers/cookies';

// 🧠 Session Creator
const createUserSessions = async (
  username: string,
  remember?: 'on',
  calledInRouteHandler?: true,
  deviceId?: string,
): Promise<SessionCreationResultT> => {
  try {
    await connectToDB();

    const userData = await UserServices.getUserDataByIdentifier(username);
    if (!userData) return { success: false };

    if (!deviceId) {
      deviceId = await getOrCreateDeviceId();
    }

    await SessionServices.deleteSession(deviceId);
    await UserServices.removeSessionFromUserByDevice(userData.id, deviceId);

    const createdSession = await SessionServices.createSession(
      userData._id as Schema.Types.ObjectId,
      deviceId,
      userData.role,
      remember,
    );
    if (!createUserSessions) {
      await SessionServices.deleteSession(deviceId);
      return { success: false };
    }

    // Access Token
    const access_token = await encrypt(
      createdSession.id,
      '12h',
      getAccessTokenSecret(),
    );
    const access_token_exp = new Date(Date.now() + hoursToMillisecond(12));
    if (!calledInRouteHandler) {
      await setCookie('access_token', access_token, access_token_exp);
    }

    await UserServices.addSessionToUser(
      userData.id,
      createdSession.id,
      deviceId,
    );

    if (remember) {
      // Refresh Token
      const refresh_token = await encrypt(
        createdSession.id,
        '14d',
        getRefreshTokenSecret(),
      );
      const refresh_token_exp = new Date(Date.now() + daysToMillisecond(14));
      if (!calledInRouteHandler) {
        await setCookie('refresh_token', refresh_token, refresh_token_exp);
      }

      createdSession.refreshToken = refresh_token;
      await createdSession.save();
      return {
        success: true,
        data: {
          access_token,
          refresh_token,
          access_token_exp,
          refresh_token_exp,
        },
      };
    } else {
      return {
        success: true,
        data: {
          access_token,
          access_token_exp,
        },
      };
    }
  } catch (err) {
    return { success: false };
  }
};

// Data Access Layer
const verifyAccessSession =
  async (): Promise<AccessSessionVerificationResultT> => {
    const falsyReturn = { isAuthenticated: false as false };

    try {
      const cookie = await getCookie('access_token');
      if (!cookie) return falsyReturn;

      const session = await decrypt(cookie || '', getAccessTokenSecret());
      if (!session || !isValidObjectId(session?.sub)) return falsyReturn;

      const sessionData = await SessionServices.getCurrentSessionById(
        session?.sub,
      );
      if (!sessionData) return falsyReturn;

      const deviceId = await getCookie('device_id');
      if (!deviceId || deviceId !== sessionData.deviceId) return falsyReturn;

      const userData = await UserServices.getUserDataById(
        sessionData.userId.toString(),
      );
      if (!userData) return falsyReturn;

      const sessionExistenceInUserDocument = userData?.sessions?.find(
        (s) => s.sessionId === sessionData.id && s.deviceId === deviceId,
      );
      if (!sessionExistenceInUserDocument) return falsyReturn;

      return {
        isAuthenticated: true,
        username: userData.username,
        userId: userData.id,
      };
    } catch (err) {
      return falsyReturn;
    }
  };

const verifyRefreshSession =
  async (): Promise<RefreshSessionVerificationResultT> => {
    const falsyReturn = { isAllowed: false as false };

    try {
      const cookie = await getCookie('refresh_token');
      if (!cookie) return falsyReturn;

      const session = await decrypt(cookie || '', getRefreshTokenSecret());
      if (!session || !isValidObjectId(session?.sub)) return falsyReturn;

      const sessionData = await SessionServices.getCurrentSessionById(
        session?.sub,
      );
      if (!sessionData) return falsyReturn;

      const deviceId = await getCookie('device_id');
      if (deviceId !== sessionData.deviceId) return falsyReturn;

      const userData = await UserServices.getUserDataById(
        sessionData.userId.toString(),
      );
      if (!userData) return falsyReturn;

      const isRefreshSessionValid = verifyHash(
        cookie,
        sessionData.refreshToken || '',
      );
      if (!isRefreshSessionValid) return falsyReturn;

      return {
        isAllowed: true,
        username: userData.username,
        userId: userData.id,
      };
    } catch (err) {
      return falsyReturn;
    }
  };

export const AuthServices = {
  createUserSessions,
  verifyAccessSession,
  verifyRefreshSession,
} as const;
