import { Document, ObjectId } from "mongoose";
import type { UserRolesType } from "../types";

export type SessionModelType = {
  userId: ObjectId;
  role: UserRolesType;
  expiresAt: Date;
};
export type SessionDocumentType = SessionModelType & Document;
