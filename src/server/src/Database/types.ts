import { FirestoreDataConverter } from 'firebase/firestore/lite';
import { AnyObj, AnyDBObj } from './Types/';

export type Collection = 'users' | 'artists' | 'songs' | 'albums';

export type ObjConverter = FirestoreDataConverter<AnyObj, AnyDBObj>;

export type Reference<T> = {
  key: keyof T;
  collection: Collection;
  relationKey: string;
};
