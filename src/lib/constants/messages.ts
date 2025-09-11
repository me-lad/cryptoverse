export const AuthMessages = {
  Error: {
    DataLack: "Please send all needed data.",
    FieldEmpty: "This field is required.",
    CatchHandler:
      "Something went wrong during the process. please check your connection and try again.",
    InvalidUsername: "The Username entered is incorrect",
    UsernameLetterCheck:
      "The Username must only contains English letters (at least 1) and Numbers.",
    UsernameMaxLengthViolation: "The Username maximum length is 64.",
    DuplicateUsername:
      "Unfortunately your chosen Username has already been taken. pls try something else.",
    DuplicatePhoneNumber: "There is already an account registered with the entered Phone Number.",
    InvalidPhoneNumber: "The Phone Number entered is incorrect.",
    PasswordShortenLength: "Password must contain at least 8 characters.",
    PasswordLengthViolation: "The Password maximum length ins 64.",
    PasswordLetterLack: "Password must contain at least 1 Letter.",
    PasswordNumberLack: "Password must contain at least 1 number.",
    PasswordCharacterLack: "Password must contain at least 1 special character.",
    PasswordConfirmMismatch: "Password and Password Repeat do not match.",
    SigninIncorrectData: "Username or Password is incorrect.",
    SigninNotVerifiedAccount:
      "Your account has' nt verified yet. Please do the verification first.",
    SigninWithRestrictedAccount:
      "Your account has been restricted. Please contact to our support to continue.",
    NotVerifiedAccount: "Your account hasn't been verified yet. pls verify it first.",
    VerificationPermanentLimit:
      "You' ve been permanently limited due to many unsuccessful verifications. Please contact our support to complete your registration.",
    VerificationTemporaryLimit:
      "You' ve been temporary limited due to high code request . Please wait.",
    VerificationIncorrectCode: "The entered code is incorrect.",
    VerifyCodeExpire: "The code has been expired. Please get a new one.",
    VerifyCodeOverUse: "This code is no longer valid due to excessive misuse.",
    VerifyCodeLength: "The verification code is 6 character length.",
  },
  Success: {
    CompleteSignup:
      "Your initial registration was successful. Please confirm the entered Phone Number to complete the registration.",
    CompleteSignin: "Signin to account successfully completed. :))",
    CompleteVerify: "Verification has successfully done. you' ll be redirecting to your dashboard.",
    CompleteResetPassword: "Your password changed successfully. Please signin with new data.",
  },
} as const;
