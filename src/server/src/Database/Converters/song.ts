import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Song, DBSong } from '../Types';

const songConverter: FirestoreDataConverter<Partial<Song>, DBSong> = {
  fromFirestore: snapshot => {
    const song = snapshot.data();
    return {
      uid: snapshot.id,
      name: song.name,
      image: song.image,
      albums: snapshot.get('albums').map((x: DocumentReference) => x.id),
      artist: snapshot.get('artist').id,
      created_at: song.created_at.toDate(),
      created_by: snapshot.get('created_by').id,
      features: snapshot.get('features').map((x: DocumentReference) => x.id),
      release_date: song.release_date.toDate()
    };
  },
  toFirestore: snapshot => {
    const created_at = snapshot.created_at as Timestamp;
    const features = snapshot?.features || [];
    const albums = snapshot?.albums || [];

    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      artist: snapshot.artist as DocumentReference,
      created_by: snapshot.created_by as DocumentReference,
      albums: albums as DocumentReference[],
      created_at: created_at || Timestamp.fromDate(new Date()),
      features: features as DocumentReference[],
      release_date: Timestamp.fromDate(
        (snapshot?.release_date as Date) || new Date()
      )
    };
  }
};

export default songConverter;
