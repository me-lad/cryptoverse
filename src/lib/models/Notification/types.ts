import { Types, HydratedDocument } from 'mongoose';

export type NotificationModelType = {
  userId: Types.ObjectId;
  title: string;
  description: string;
  hasRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date;
};

export type NotificationDocumentType = HydratedDocument<NotificationModelType>;
