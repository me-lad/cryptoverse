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
import { connectToDB } from '~configs/mongoose';
import { UserServices } from '~services/user';
import { SessionServices } from '~services/session';
import { decrypt, encrypt } from '~helpers/token';
import { getAccessTokenSecret, getRefreshTokenSecret } from '~helpers/token';
import { verifyHash } from '~helpers/hash';
import { setCookie, getCookie, deleteCookie } from '~helpers/cookies';

// 🧠 Session Creator
const createUserSessions = async (
  username: string,
  remember?: 'on',
  calledInRouteHandler?: true,
): Promise<SessionCreationResultT> => {
  try {
    await connectToDB();

    const userData = await UserServices.getUserDataByIdentifier(username);
    if (!userData) return { success: false };

    await SessionServices.deleteSession(userData.id);
    const createdSession = await SessionServices.createSession(
      userData.id,
      userData.role,
      remember,
    );

    // Access Token
    const access_token = await encrypt(
      createdSession.id,
      '12h',
      getAccessTokenSecret(),
    );
    const access_token_exp = new Date(Date.now() + hoursToMillisecond(12));
    if (!calledInRouteHandler)
      await setCookie('access_token', access_token, access_token_exp);

    if (remember) {
      // Refresh Token
      const refresh_token = await encrypt(
        createdSession.id,
        '14d',
        getRefreshTokenSecret(),
      );
      const refresh_token_exp = new Date(Date.now() + daysToMillisecond(14));
      if (!calledInRouteHandler)
        await setCookie('refresh_token', refresh_token, refresh_token_exp);

      await UserServices.updateUserSessionRelatedFields(
        userData._id as Schema.Types.ObjectId,
        refresh_token,
        createdSession.id,
      );
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
      userData.sessionId = createdSession.id;
      await userData.save();
      return {
        success: true,
        data: {
          access_token,
          access_token_exp,
        },
      };
    }
  } catch (err) {
    console.log('Error in user session creation ->', err);
    return { success: false };
  }
};

const deleteUserSessions = async (userId: string) => {
  const userData = await UserServices.getUserDataById(userId);
  if (userData) {
    userData.refreshToken = undefined;
    userData.refreshTokenExpiresAt = new Date(Date.now() - 60_000);
    await userData.save();
  }
  await deleteCookie('access_token');
  await deleteCookie('refresh_token');
  await SessionServices.deleteSession(userId);
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

      const userData = await UserServices.getUserDataById(
        sessionData.userId.toString(),
      );

      if (!userData || userData.sessionId != sessionData.id) return falsyReturn;

      return { isAuthenticated: true, userId: userData.id };
    } catch (err) {
      console.log('Error in verify session DAL ->', err);
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

      const userData = await UserServices.getUserDataById(
        sessionData.userId.toString(),
      );
      if (!userData) return falsyReturn;

      const isRefreshSessionValid = verifyHash(
        cookie,
        userData.refreshToken || '',
      );
      if (!isRefreshSessionValid) return falsyReturn;

      return { isAllowed: true, userId: userData.id };
    } catch (err) {
      console.log('Error in verify session DAL ->', err);
      return falsyReturn;
    }
  };

export const AuthServices = {
  createUserSessions,
  deleteUserSessions,
  verifyAccessSession,
  verifyRefreshSession,
} as const;
