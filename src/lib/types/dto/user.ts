export interface HeaderReceivableUserDataT {
  profileImage: string;
  username: string;
  phoneNumber: string;
}

export type HeaderReceivableUserDataQueryT =
  `${keyof HeaderReceivableUserDataT} ${keyof HeaderReceivableUserDataT} ${keyof HeaderReceivableUserDataT}`;
