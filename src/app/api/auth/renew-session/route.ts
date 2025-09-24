// 📦 Third-Party imports
import { NextResponse } from 'next/server';

// 📦 Internal imports
import { AuthServices } from '~services/auth';
import { UserServices } from '~services/user';

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) return NextResponse.json({ success: false });

  const userData = await UserServices.getUserDataById(userId);
  const creationResult = await AuthServices.createUserSessions(
    userData?.username || '',
    'on',
    true,
  );
  if (!creationResult.success) {
    const response = NextResponse.json({ success: false });
    await AuthServices.deleteUserSessions(userId);
    response.cookies.delete('access_token');
    return response;
  }

  const response = NextResponse.json({ success: true });
  const isDev = process.env.NODE_ENV !== 'production';
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
