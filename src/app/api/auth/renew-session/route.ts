// 📦 Third-Party imports
import { NextResponse } from 'next/server';

// 📦 Internal imports
import { AuthServices } from '~services/repositories/auth';
import { UserServices } from '~services/repositories/user';
import { getOrCreateDeviceId } from '~helpers/cookies';

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) return NextResponse.json({ success: false });

  const userData = await UserServices.getUserDataById(userId);
  const deviceId = await getOrCreateDeviceId(true);
  const creationResult = await AuthServices.createUserSessions(
    userData?.username || '',
    'on',
    true,
    deviceId,
  );
  if (!creationResult.success) {
    const response = NextResponse.json({ success: false });
    response.cookies.delete('access_token');
    return response;
  }

  const response = NextResponse.json({ success: true });
  const isDev = process.env.NODE_ENV !== 'production';
  response.cookies.set('device_id', deviceId, {
    httpOnly: true,
    secure: !isDev,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  response.cookies.set('access_token', creationResult.data.access_token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: 'lax',
    path: '/',
    expires: creationResult.data.access_token_exp,
  });
  response.cookies.set('refresh_token', creationResult.data.refresh_token!, {
    httpOnly: true,
    secure: !isDev,
    sameSite: 'lax',
    path: '/',
    expires: creationResult.data.refresh_token_exp!,
  });
  return response;
}
