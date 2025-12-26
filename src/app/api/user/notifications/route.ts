import { NextResponse } from 'next/server';
import { NotificationServices } from '~services/repositories/notification';
import { UserServices } from '~services/repositories/user';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('uid');

    const notifications = await UserServices.getUserNotifications(userId || '');

    return NextResponse.json(notifications);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    await NotificationServices.setAllUserNotificationsAsRead(uid || '');
    return NextResponse.json(
      { message: 'Notifications status has been changed.' },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 },
    );
  }
}
