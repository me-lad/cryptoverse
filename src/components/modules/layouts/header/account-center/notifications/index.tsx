// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import { useQuery } from '@tanstack/react-query';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import {
  DropDownAggregator,
  DropDownMenu,
  DropDownTrigger,
} from '~core/global/dropdown';

// 🧾 Local types
interface PropsT {
  userId: string;
}

// ⚙️ Functional component
const Notifications: React.FC<PropsT> = ({ userId }) => {
  const queryKey = ['notifications'];
  const queryFn = async () => {
    if (!userId) return [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchUrl = `${baseUrl}/api/user/notifications?uid=${userId}`;

    const resp = await fetch(fetchUrl);
    if (!resp.ok) throw new Error('Failed to fetch notifications');

    return resp.json();
  };

  const { data, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!userId,
  });

  const formatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-US', {
      day: '2-digit',
      year: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const markAllNotificationsAsRead = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchUrl = `${baseUrl}/api/user/notifications`;

    const resp = await fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify({ uid: userId }),
    });

    if (resp.ok) {
      refetch();
    }
  };

  const generateTargetArray = () => (data || []).filter((n: any) => !n.hasRead);

  return (
    <DropDownAggregator overlay="dark">
      <DropDownTrigger>
        <div className="relative">
          <Bell className="hover:cursor-pointer" size={22} />
          {!!generateTargetArray().length && (
            <span className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-white">
              {generateTargetArray().length}
            </span>
          )}
        </div>
      </DropDownTrigger>
      <DropDownMenu className="mt-7 w-88 p-5 max-[37.5em]:-left-32 max-[27.5em]:fixed max-[27.5em]:top-10 max-[27.5em]:right-0 max-[27.5em]:left-0 max-[27.5em]:mx-auto max-[27.5em]:w-[90vw] max-[27.5em]:translate-x-0 lg:-left-28 xl:-left-20 2xl:left-1/2">
        <div className={flexBetween}>
          {!!generateTargetArray().length && (
            <>
              <p>
                {generateTargetArray().length} New Notification
                {generateTargetArray().length > 1 ? 's' : ''}
              </p>

              <Button
                variant={'ghost'}
                size={'sm'}
                className="hover:text-primary-300 cursor-pointer rounded-full transition-all"
                onClick={markAllNotificationsAsRead}
              >
                Read All
              </Button>
            </>
          )}
        </div>
        <div className="mt-5 *:not-first:mt-5 *:not-last:border-b *:not-last:pb-5">
          {generateTargetArray().length ? (
            generateTargetArray().map((n) => (
              <div key={n.id}>
                <div className="flex items-center gap-2">
                  <span className="bg-primary mt-1 h-3 w-3 rounded-full"></span>
                  <h4 className="font-semibold">{n.title}</h4>
                </div>
                <p className="mt-2 line-clamp-2 text-sm opacity-90">
                  {n.description}
                </p>
                <p className="mt-2 text-sm opacity-90">
                  {formatDate(n.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="pb-5 text-center text-lg font-semibold">
              There is no new notification
            </p>
          )}
        </div>
      </DropDownMenu>
    </DropDownAggregator>
  );
};
export default Notifications;
