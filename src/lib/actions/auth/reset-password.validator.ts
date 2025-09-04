// Packages imports
import { z } from "zod";

// Local imports
import { AuthMessages } from "./auth.messages";
import { AuthPatterns } from "./auth.patterns";

export const ResetPasswordFormSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        error: `${AuthMessages.Error_FieldEmpty} (min-length: 4)`,
        abort: true,
      })
      .max(64, AuthMessages.Error_UsernameMaxLengthViolation)
      .regex(AuthPatterns.UsernameLetter, {
        error: AuthMessages.Error_UsernameLetterCheck,
      })
      .trim(),

    code: z
      .string()
      .length(6, { error: `${AuthMessages.Error_FieldEmpty} (length: 6)`, abort: true }),

    password: z
      .string()
      .min(1, {
        error: AuthMessages.Error_FieldEmpty,
        abort: true,
      })
      .max(64, AuthMessages.Error_PasswordLengthViolation)
      .regex(AuthPatterns.PasswordLetter, {
        error: AuthMessages.Error_PasswordLetterLack,
      })
      .regex(AuthPatterns.PasswordCharacter, {
        error: AuthMessages.Error_PasswordCharacterLack,
      })
      .regex(AuthPatterns.PasswordNumber, {
        error: AuthMessages.Error_PasswordNumberLack,
      })
      .trim(),

    passwordRepeat: z
      .string()
      .min(1, AuthMessages.Error_FieldEmpty)
      .max(64, AuthMessages.Error_PasswordLengthViolation)
      .trim(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    error: AuthMessages.Error_PasswordConfirmMismatch,
    path: ["passwordRepeat"],
  });
