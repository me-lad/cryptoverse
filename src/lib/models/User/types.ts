import type { NotificationModelType } from '../Notification/types';
import type { UserRolesType } from '../types';
import { Document } from 'mongoose';

export type UserModelType = {
  username: string;
  phoneNumber: string;
  password: string;
  profileImage?: string;
  email?: string;
  fullName?: string;
  role: UserRolesType;
  isVerified: boolean;
  isRestricted: boolean;
  favorites?: any[];
  sessions?: { sessionId: string; deviceId: string }[];
  notifications?: NotificationModelType[];
  passwordChangedAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
export type UserDocumentType = UserModelType & Document;
