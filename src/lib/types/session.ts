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

export type AccessSessionVerificationResultType = AuthenticatedSession | UnAuthenticatedSession;

export type RefreshSessionVerificationResultType = AllowedRefreshSession | UnAllowedRefreshSession;

export type SessionCreationResultType = SuccessfulSessionCreation | UnSuccessfulSessionCreation;
