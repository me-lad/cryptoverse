import { Document } from "mongoose";
import type { OtpUsagesType } from "../types";

export type OtpModelType = {
  phoneNumber: string;
  code: string;
  isVerified?: boolean;
  usageCount: number;
  usage?: OtpUsagesType;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OtpDocumentType = OtpModelType & Document;
