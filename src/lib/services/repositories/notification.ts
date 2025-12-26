import mongoose from 'mongoose';

import type { NotificationModelType } from '~models/Notification/types';
import { connectToDB } from '~vendors/mongoose';
import NotificationModel from '~models/Notification';

// 🧠 Ensure DB is connected and model is initialized
const initializeNotificationModel = async () => {
  await connectToDB();
  if (!mongoose.models.Notification) await NotificationModel.model.init();
};

const createNotification = async (data: NotificationModelType) => {
  await initializeNotificationModel();
  return NotificationModel.model.create(data);
};

const createDefaultRegistrationNotifications = async (userId: string) => {
  const defaults = [
    {
      userId,
      title: 'Welcome to CryptoVerse!',
      description:
        'Thanks for joining our community. Explore your dashboard to track your portfolio, view live prices, and stay updated with the latest market trends.',
    },
    {
      userId,
      title: 'Customize Your Dashboard',
      description:
        'Personalize your experience by choosing your favorite cryptocurrencies, setting up a watchlist, and selecting your preferred display theme.',
    },
    {
      userId,
      title: 'Start Building Your Portfolio',
      description:
        'Add your first wallet address or connect an exchange account to begin tracking your holdings in real time.',
    },
  ];

  return NotificationModel.model.create(defaults);
};

const changeNotificationReadStatus = async (
  notificationId: string,
  newStatus: boolean,
) => {
  return NotificationModel.model.updateOne(
    { _id: notificationId },
    { $set: { hasRead: newStatus } },
  );
};

const setAllUserNotificationsAsRead = async (userId: string) => {
  return NotificationModel.model.updateMany(
    { userId },
    { $set: { hasRead: true } },
  );
};

const deleteNotifications = async (userId: string) => {
  await NotificationModel.model.deleteMany({ userId });
};

export const NotificationServices = {
  createNotification,
  createDefaultRegistrationNotifications,
  changeNotificationReadStatus,
  setAllUserNotificationsAsRead,
  deleteNotifications,
} as const;
