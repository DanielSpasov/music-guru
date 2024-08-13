import { Favorites } from '../Utils';

export type User = {
  uid: string;
  verified: boolean;
  created_at: string;
  email: string;
  username: string;
  favorites: Favorites;
};

export type ListUser = {
  uid: string;
  created_at: string;
  email: string;
  username: string;
};
