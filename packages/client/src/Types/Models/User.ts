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
  username: string;
};

export type Editor = ListUser & {
  is_editor: boolean;
  name: string;
};
