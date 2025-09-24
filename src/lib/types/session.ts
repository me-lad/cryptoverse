interface AuthenticatedSession {
  isAuthenticated: true;
  userId: string;
}

interface UnAuthenticatedSession {
  isAuthenticated: false;
  userId?: never;
}

interface AllowedRefreshSession {
  isAllowed: true;
  userId: string;
}

interface UnAllowedRefreshSession {
  isAllowed: false;
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
