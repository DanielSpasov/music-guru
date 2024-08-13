import { Document } from 'mongoose';

export type AlbumType = Document & {
  code: string;
  name: string;
  uid: string;
};
