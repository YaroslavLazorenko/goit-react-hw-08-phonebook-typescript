export interface IContactId {
  id: string;
}

export interface IContactNameAndNumber {
  name: string;
  number: string;
}

export interface IContact extends IContactId, IContactNameAndNumber {}
