// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useEffect, useState } from 'react';

// 🧾 Local types and helper
interface PropsT {
  publishedAt: number;
}

const formatTimeAgo = (publishedAt: number): string => {
  const now = Date.now();
  const diffMs = now - publishedAt;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) {
    return 'Just Now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 365) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return `${diffDays} days (${diffYears} year${diffYears !== 1 ? 's' : ''} ago)`;
};

export const TimeAgo = ({ publishedAt }: PropsT) => {
  const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(publishedAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(publishedAt));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [publishedAt]);

  return <span>{timeAgo}</span>;
};
