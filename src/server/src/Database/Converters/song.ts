import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Song, DBSong, ConvertType } from '../Types';
import { getDataByType } from './helpers';

const songConverter = (
  ct: ConvertType
): FirestoreDataConverter<Song, DBSong> => ({
  fromFirestore: async snapshot => {
    const song = snapshot.data();
    return Promise.resolve({
      uid: snapshot.id,
      name: song.name,
      image: song.image,
      release_date: song.release_date.toDate(),
      created_at: song.created_at.toDate(),
      created_by: await getDataByType<Song>(ct, song, 'created_by'),
      artist: await getDataByType<Song>(ct, song, 'artist'),
      albums: await getDataByType<Song>(ct, song, 'albums'),
      features: await getDataByType<Song>(ct, song, 'features')
    });
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
});

export default songConverter;
