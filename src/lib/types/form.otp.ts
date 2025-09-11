export type OtpCheckerResultType =
  | { status: "Allowed" }
  | { status: "Waiting"; referenceTime: Date; isTemporaryLimit?: true }
  | { status: "Limited" }
  | { status: "Error"; message: string };

export type OtpResendResultType =
  | { success: true; newReferenceTime: Date }
  | {
      success: false;
      message: string;
      refreshNeed?: true;
      isTemporaryLimit?: true;
      referenceTime?: Date;
    };
