import { atom } from 'recoil';

// export const accountState = atom({
//   key: 'account',
//   default: JSON.parse(localStorage.account) as IAccount,
// });

export const accountTypeState = atom({
  key: 'accountType',
  default: localStorage.accountType as AccountType,
});

export type AccountType = 'microsoft' | 'offline'

export interface IAccount {
  displayName: string;
  uuid: string;
}
