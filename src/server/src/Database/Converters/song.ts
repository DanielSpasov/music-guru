import { FirestoreDataConverter, Timestamp } from 'firebase/firestore/lite';

import { Song, DBSong } from '../Types';

const songConverter: FirestoreDataConverter<Partial<Song>, DBSong> = {
  fromFirestore: snapshot => {
    const song = snapshot.data();
    return {
      uid: snapshot.id,
      name: song.name,
      image: song.image,
      created_at: song.created_at.toDate(),
      release_date: song.release_date?.toDate(),
      created_by: song.created_by,
      artist: song.artist,
      features: song.features
    };
  },
  toFirestore: snapshot => {
    const created_at = snapshot.created_at as Timestamp;
    const release_date = snapshot.release_date as Timestamp;

    return {
      name: String(snapshot.name),
      image: String(snapshot?.image || ''),
      created_at: created_at || Timestamp.fromDate(new Date()),
      release_date: release_date || null,
      created_by: String(snapshot.created_by),
      artist: String(snapshot.artist),
      features: snapshot.features
        ? (snapshot.features as string[]).map(x => String(x))
        : []
    };
  }
};

export default songConverter;
