export interface User {
  id: string;
  createdAt: Date;
  firstName: string;
  fullName: string;
  avatar: string;
  email: string;
  lastName: string;
  addresses: Address[];
  contacts: Contact[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  number: string;
  countryCode: string;
  id: string;
  userId: string;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
}
