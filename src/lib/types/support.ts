import type { SupportMessageType } from '~models/SupportMessage/types';

interface SuccessSend {
  success: true;
  message: string;
}
interface ErrorSend {
  success: false;
  errMessage?: string;
  properties?: Partial<SupportMessageType>;
}
export type MessageSendResultT = SuccessSend | ErrorSend;

export interface SupportFormFieldT {
  id: number;
  placeholder: string;
  name: keyof SupportMessageType;
  parentClassName: string;
}
