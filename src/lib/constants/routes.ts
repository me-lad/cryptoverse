export const footerLessRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/verify",
];

export const headerLessRoutes = [...footerLessRoutes];

export const loginNecessaryRoutes = ["/dashboard"];

export const logoutNecessaryRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/verify",
  "/auth/reset-password",
];
