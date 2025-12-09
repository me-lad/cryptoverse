// 📦 Third-Party imports
import { z } from 'zod';

// 📦 Internal imports
import { Messages } from '~constants/messages';
import { AuthPatterns } from '~constants/patterns';

export const ResetPasswordFormSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        error: `${Messages.Error.FieldEmpty} (min-length: 4)`,
        abort: true,
      })
      .max(64, Messages.Error.UsernameMaxLengthViolation)
      .regex(AuthPatterns.UsernameLetter, {
        error: Messages.Error.UsernameLetterCheck,
      })
      .trim(),

    code: z.string().min(1, Messages.Error.FieldEmpty),

    password: z
      .string()
      .min(1, {
        error: Messages.Error.FieldEmpty,
        abort: true,
      })
      .max(64, Messages.Error.PasswordLengthViolation)
      .regex(AuthPatterns.PasswordLetter, {
        error: Messages.Error.PasswordLetterLack,
      })
      .regex(AuthPatterns.PasswordCharacter, {
        error: Messages.Error.PasswordCharacterLack,
      })
      .regex(AuthPatterns.PasswordNumber, {
        error: Messages.Error.PasswordNumberLack,
      })
      .trim(),

    passwordRepeat: z
      .string()
      .min(1, Messages.Error.FieldEmpty)
      .max(64, Messages.Error.PasswordLengthViolation)
      .trim(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    error: Messages.Error.PasswordConfirmMismatch,
    path: ['passwordRepeat'],
  });
