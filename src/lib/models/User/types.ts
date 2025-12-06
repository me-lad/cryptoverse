import { Document, ObjectId } from 'mongoose';
import type { UserRolesType } from '../types';

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
  passwordChangedAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
export type UserDocumentType = UserModelType & Document;
