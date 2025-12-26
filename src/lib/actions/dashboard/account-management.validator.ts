// 📦 Third-Party imports
import { z } from 'zod';

// 📦 Internal imports
import { Messages } from '~constants/messages';
import { AuthPatterns } from '~constants/patterns';

export const AccountManagementFormSchema_Username = z.object({
  username: z
    .string()
    .min(4, {
      error: 'Username should contains at least 4 characters',
      abort: true,
    })
    .max(64, Messages.Error.UsernameMaxLengthViolation)
    .regex(AuthPatterns.UsernameLetter, {
      error: Messages.Error.UsernameLetterCheck,
    })
    .trim(),
});

export const AccountManagementFormSchema_Email = z.object({
  email: z.email({ error: 'Enter a valid email address' }),
});

export const AccountManagementFormSchema_FullName = z.object({
  fullName: z.string().min(5, 'Enter a valid name'),
});
