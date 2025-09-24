import { Document } from "mongoose";

export interface SupportMessageType {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
export type SupportMessageDocumentType = SupportMessageType & Document;
