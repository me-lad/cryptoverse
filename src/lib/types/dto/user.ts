export interface HeaderReceivableUserDataT {
  profileImage: string;
  fullName: string;
  phoneNumber: string;
}

export type HeaderReceivableUserDataQueryT =
  `${keyof HeaderReceivableUserDataT} ${keyof HeaderReceivableUserDataT} ${keyof HeaderReceivableUserDataT}`;
