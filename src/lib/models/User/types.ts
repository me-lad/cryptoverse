import { Document, ObjectId } from "mongoose";
import type { UserRolesType } from "../types";

export type UserModelType = {
  username: string;
  phoneNumber: string;
  password: string;
  profileImage?: string;
  role: UserRolesType;
  isVerified: boolean;
  isRestricted: boolean;
  favorites?: any[];
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  sessionId?: ObjectId;
  passwordChangedAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
export type UserDocumentType = UserModelType & Document;
