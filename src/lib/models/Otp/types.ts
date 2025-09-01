import { Document } from "mongoose";

export const OtpUsagesEnum = ["VERIFY", "RESETPASSWORD"] as const;
type OtpUsagesType = (typeof OtpUsagesEnum)[number];

export type OtpModelType = {
  phoneNumber: string;
  code: string;
  isVerified?: boolean;
  usageCount: number;
  usage?: OtpDocumentType;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OtpDocumentType = OtpModelType & Document;
