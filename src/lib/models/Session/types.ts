import { Document, ObjectId } from 'mongoose';
import type { UserRolesType } from '../types';

export type SessionModelType = {
  userId: ObjectId;
  deviceId: string;
  role: UserRolesType;
  expiresAt: Date;
  refreshToken?: string;
};
export type SessionDocumentType = SessionModelType & Document;
