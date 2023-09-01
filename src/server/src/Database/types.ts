import { FirestoreDataConverter } from 'firebase/firestore/lite';
import { AnyObj, AnyDBObj } from '../Types';

export type Collection = 'users' | 'artists' | 'songs' | 'albums';

export type ObjConverter = FirestoreDataConverter<AnyObj, AnyDBObj>;
