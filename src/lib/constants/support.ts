import type { SupportMessageType } from '~models/SupportMessage/types';
import type { SupportFormFieldT } from '~types/support';
import { buildRandomID } from '~helpers/generators';

export const supportFormFields: SupportFormFieldT[] = [
  {
    id: buildRandomID(),
    placeholder: 'First Name',
    name: 'firstName',
    parentClassName: 'pr-2',
  },
  {
    id: buildRandomID(),
    placeholder: 'Last Name',
    name: 'lastName',
    parentClassName: 'pl-2',
  },
  {
    id: buildRandomID(),
    placeholder: 'Email',
    name: 'email',
    parentClassName: 'col-span-2',
  },
  {
    id: buildRandomID(),
    placeholder: 'Message',
    name: 'message',
    parentClassName: 'col-span-2',
  },
] as const;

export const fieldLabels: Record<keyof SupportMessageType, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  message: 'Message',
} as const;
