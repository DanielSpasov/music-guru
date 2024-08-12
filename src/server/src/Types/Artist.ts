import { BaseDBModel } from './Base';
import { DBUser } from './User';

export type DBArtist = BaseDBModel & {
  name: string;
  about: string;
  favorites: number;
  links: { name: string; url: string }[];
  image: string;
  uid: string;
  created_by: DBUser;
  created_at: Date;
};
