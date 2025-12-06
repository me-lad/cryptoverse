// 📌 Directives
import 'server-only';

// 📦 Third-Party imports
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export const setCookie = async (name: string, value: string, expires: Date) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires,
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value || '';
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export const getOrCreateDeviceId = async (calledInRouteHandler?: true) => {
  const cookieStore = await cookies();
  const existing = cookieStore.get('device_id');

  if (existing?.value) {
    return existing.value;
  }

  const newId = randomUUID();

  if (!calledInRouteHandler) {
    const isDev = process.env.NODE_ENV !== 'production';
    cookieStore.set('device_id', newId, {
      httpOnly: true,
      secure: !isDev,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return newId;
};
