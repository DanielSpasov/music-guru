import { User } from './User';

export type BaseModel = {
  uid: string;
  name: string;
  image: string;
  editors: User[];
  favorites: number;
  created_at: Date;
  created_by: User;
};
