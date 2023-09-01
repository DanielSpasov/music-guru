import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Song, DBSong } from '../../Types';

const songConverter: FirestoreDataConverter<Song, DBSong> = {
  fromFirestore: snapshot => {
    const song = snapshot.data();
    return {
      uid: snapshot.id,
      name: song.name,
      image: song.image,
      release_date: song.release_date.toDate(),
      created_at: song.created_at.toDate(),
      created_by: {},
      artist: {},
      albums: [],
      features: []
    };
  },
  toFirestore: snapshot => {
    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      artist: snapshot.artist as DocumentReference,
      created_by: snapshot.created_by as DocumentReference,
      albums: [],
      created_at: Timestamp.fromDate(new Date()),
      features: snapshot.features as DocumentReference[],
      release_date: Timestamp.fromDate(
        (snapshot.release_date as Date) || new Date()
      )
    };
  }
};

export default songConverter;
