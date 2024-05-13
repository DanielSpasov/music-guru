import { Favorites } from './Favorites';

export interface User {
  uid: string;
  verified: boolean;
  created_at: string;
  email: string;
  username: string;
  favorites: Favorites;
}

export interface ListUser {
  uid: string;
  username: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  repeat_password: string;
  username: string;
}
