export const AuthPatterns = {
  Phone: /^(\+98|0)?9\d{9}$/,
  PasswordLetter: /[a-zA-Z]/,
  PasswordNumber: /[0-9]/,
  PasswordCharacter: /[^a-zA-Z0-9]/,
  UsernameLetter: /^[A-Za-z]+$/,
  ObjectId: /^[a-f\d]{24}$/i,
} as const;
