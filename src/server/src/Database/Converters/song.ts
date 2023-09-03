import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Song, DBSong } from '../Types';
import { getRefData } from '../../Controllers/helpers/helpers';

const songConverter: FirestoreDataConverter<Song, DBSong> = {
  fromFirestore: async snapshot => {
    const song = snapshot.data();
    return Promise.resolve({
      uid: snapshot.id,
      name: song.name,
      image: song.image,
      release_date: song.release_date.toDate(),
      created_at: song.created_at.toDate(),
      created_by: await getRefData(song.created_by),
      artist: await getRefData(song.artist),
      albums: await Promise.all(song.albums.map(getRefData)),
      features: await Promise.all(song.features.map(getRefData))
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
};

export default songConverter;
