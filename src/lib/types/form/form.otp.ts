export type OtpCheckerResultT =
  | { status: 'Allowed' }
  | { status: 'Waiting'; referenceTime: Date; isTemporaryLimit?: true }
  | { status: 'Limited' }
  | { status: 'Error'; message: string };

export type OtpResendResultT =
  | { success: true; newReferenceTime: Date }
  | {
      success: false;
      message: string;
      refreshNeed?: true;
      isTemporaryLimit?: true;
      referenceTime?: Date;
    };
