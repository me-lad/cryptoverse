export const UserRolesEnum = ["ADMIN", "USER"] as const;
export type UserRolesType = (typeof UserRolesEnum)[number];
