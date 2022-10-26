export interface User {
  createdAt: Date;
  firstName: string;
  avatar: string;
  email: string;
  lastName: string;
  id: string;
  address: Address[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  number: number;
  countryCode: string;
  id: string;
  userId: string;
}
