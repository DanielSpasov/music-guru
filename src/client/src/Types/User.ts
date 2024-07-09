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
