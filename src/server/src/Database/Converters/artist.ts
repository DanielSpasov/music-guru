import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Artist, DBArtist } from '../Types';

const artistConverter: FirestoreDataConverter<Partial<Artist>, DBArtist> = {
  fromFirestore: snapshot => {
    const artist = snapshot.data();
    return {
      uid: snapshot.id,
      name: artist.name,
      image: artist.image,
      created_at: artist.created_at.toDate(),
      created_by: snapshot.get('created_by').id
    };
  },
  toFirestore: snapshot => {
    const created_at = snapshot.created_at as Timestamp;
    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      created_at: created_at || Timestamp.fromDate(new Date()),
      created_by: snapshot.created_by as DocumentReference
    };
  }
};

export default artistConverter;
