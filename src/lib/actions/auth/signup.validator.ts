// Packages imports
import { z } from "zod";

// Local imports
import { AuthMessages } from "~constants/messages";
import { AuthPatterns } from "~constants/patterns";

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        error: `${AuthMessages.Error.FieldEmpty} (min-length: 4)`,
        abort: true,
      })
      .max(64, AuthMessages.Error.UsernameMaxLengthViolation)
      .regex(AuthPatterns.UsernameLetter, {
        error: AuthMessages.Error.UsernameLetterCheck,
      })
      .trim(),

    phoneNumber: z
      .string()
      .min(1, { error: AuthMessages.Error.FieldEmpty, abort: true })
      .max(11, { error: AuthMessages.Error.InvalidPhoneNumber, abort: true })
      .regex(AuthPatterns.Phone, {
        error: AuthMessages.Error.InvalidPhoneNumber,
      })
      .trim(),

    password: z
      .string()
      .min(1, {
        error: AuthMessages.Error.FieldEmpty,
        abort: true,
      })
      .max(64, AuthMessages.Error.PasswordLengthViolation)
      .regex(AuthPatterns.PasswordLetter, {
        error: AuthMessages.Error.PasswordLetterLack,
      })
      .regex(AuthPatterns.PasswordCharacter, {
        error: AuthMessages.Error.PasswordCharacterLack,
      })
      .regex(AuthPatterns.PasswordNumber, {
        error: AuthMessages.Error.PasswordNumberLack,
      })
      .trim(),

    passwordRepeat: z
      .string()
      .min(1, AuthMessages.Error.FieldEmpty)
      .max(64, AuthMessages.Error.PasswordLengthViolation)
      .trim(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    error: AuthMessages.Error.PasswordConfirmMismatch,
    path: ["passwordRepeat"],
  });
