// 📦 Third-Party imports
import { NextResponse } from 'next/server';

// 📦 Internal imports
import { AuthMessages } from '~constants/messages';
import { UserServices } from '~services/user';

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({
      success: false,
      message: AuthMessages.Error.DataLack,
    });
  }

  const userData = await UserServices.getUserDataByIdentifier(username);

  if (!userData) {
    return NextResponse.json({
      success: false,
      message: AuthMessages.Error.CatchHandler,
    });
  }

  return NextResponse.json(userData);
}
