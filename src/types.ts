export interface IContactId {
  id: string;
}

export interface IContactNameAndNumber {
  name: string;
  number: string;
}

export interface IContact extends IContactId, IContactNameAndNumber {}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthFetchingData {
  user: { name: string | null; email: string | null };
  token: string | null;
}

export interface IAuthRefreshUser {
  name: string | null;
  email: string | null;
}

export type RejectValueType = string | null;

export type TokenType = string | null;
