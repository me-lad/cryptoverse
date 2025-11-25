import { Types, HydratedDocument } from 'mongoose';

export const BlockSourcesEnum = ['Otp', 'Signin'] as const;
type BlockSourcesType = (typeof BlockSourcesEnum)[number];

export type BlockedNumberType = {
  phoneNumber: string;
  isPermanent?: boolean;
  blockedBy?: Types.ObjectId;
  blockedAt?: Date;
  expiresAt?: Date;
  source?: BlockSourcesType;
  note?: string;
};

export type BlockedNumberDocumentType = HydratedDocument<BlockedNumberType>;
