import axios from 'axios';
import {
  IAuthFetchingData,
  IContact,
  IContactId,
  IContactNameAndNumber,
  ILoginCredentials,
  IRegisterCredentials,
  TokenType,
} from 'types';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token: TokenType): void {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(): void {
    axios.defaults.headers.common.Authorization = '';
  },
};

export async function registerNewUser(
  credentials: IRegisterCredentials,
): Promise<IAuthFetchingData> {
  const { data } = await axios.post<IAuthFetchingData>('/users/signup', credentials);
  token.set(data.token);
  return data;
}

export async function loginUser(credentials: ILoginCredentials): Promise<IAuthFetchingData> {
  const { data } = await axios.post<IAuthFetchingData>('/users/login', credentials);
  token.set(data.token);
  return data;
}

export async function logoutUser(): Promise<void> {
  await axios.post<void>('/users/logout');
  token.unset();
}

export async function refreshUser(persistedToken: TokenType): Promise<IAuthFetchingData> {
  token.set(persistedToken);
  const { data } = await axios.get<IAuthFetchingData>('/users/current');
  return data;
}

export async function fetchContacts(persistedToken: TokenType): Promise<IContact[]> {
  token.set(persistedToken);
  const { data } = await axios.get<IContact[]>('/contacts');
  return data;
}

export async function postContact(contact: IContactNameAndNumber): Promise<string> {
  const { data } = await axios.post<IContactId>('/contacts', contact);
  return data.id;
}

export async function deleteContact(id: string): Promise<void> {
  await axios.delete<void>(`/contacts/${id}`);
}
