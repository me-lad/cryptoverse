import type { SupportMessageType } from '~models/SupportMessage/types';
import { fieldLabels } from '~modules/pages/support/local';
import { AuthPatterns } from '~constants/patterns';

export const validateFields = (
  data: SupportMessageType,
): Partial<SupportMessageType> => {
  const errors: Partial<SupportMessageType> = {};

  for (const key in data) {
    const value = data[key as keyof SupportMessageType];
    if (!value) {
      errors[key as keyof SupportMessageType] =
        `${fieldLabels[key as keyof SupportMessageType]} is required.`;
    }
  }

  if (
    data.firstName.length < 3 ||
    data.lastName.length < 3 ||
    data.message.length < 8
  ) {
    errors.message ||= 'The entered data is not valid.';
  }

  if (!AuthPatterns.Email.test(data.email)) {
    errors.email ||=
      'Please enter a valid email so we can respond to you later.';
  }

  return errors;
};
