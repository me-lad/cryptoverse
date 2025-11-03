interface AuthenticatedSession {
  isAuthenticated: true;
  username: string;
  userId: string;
}

interface UnAuthenticatedSession {
  isAuthenticated: false;
  username?: never;
  userId?: never;
}

interface AllowedRefreshSession {
  isAllowed: true;
  username: string;
  userId: string;
}

interface UnAllowedRefreshSession {
  isAllowed: false;
  username?: never;
  userId?: never;
}

interface SuccessfulSessionCreation {
  success: true;
  data: {
    access_token: string;
    refresh_token?: string;
    access_token_exp: Date;
    refresh_token_exp?: Date;
  };
}

interface UnSuccessfulSessionCreation {
  success: false;
}

export type AccessSessionVerificationResultT =
  | AuthenticatedSession
  | UnAuthenticatedSession;

export type RefreshSessionVerificationResultT =
  | AllowedRefreshSession
  | UnAllowedRefreshSession;

export type SessionCreationResultT =
  | SuccessfulSessionCreation
  | UnSuccessfulSessionCreation;
