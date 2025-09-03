export const UserRolesEnum = ["Admin", "User"] as const;
export type UserRolesType = (typeof UserRolesEnum)[number];

export const OtpUsagesEnum = ["Verify", "ResetPassword"] as const;
export type OtpUsagesType = (typeof OtpUsagesEnum)[number];
