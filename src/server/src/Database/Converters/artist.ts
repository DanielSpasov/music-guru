import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Artist, ConvertType, DBArtist } from '../Types';
import { getDataByType } from './helpers';

const artistConverter = (
  ct: ConvertType
): FirestoreDataConverter<Artist, DBArtist> => ({
  fromFirestore: async snapshot => {
    const artist = snapshot.data();
    return Promise.resolve({
      uid: snapshot.id,
      name: artist.name,
      image: artist.image,
      created_at: artist.created_at.toDate(),
      created_by: await getDataByType<Artist>(ct, artist, 'created_by'),
      songs: await getDataByType<Artist>(ct, artist, 'songs'),
      albums: await getDataByType<Artist>(ct, artist, 'albums'),
      features: await getDataByType<Artist>(ct, artist, 'features')
    });
  },
  toFirestore: snapshot => {
    const created_at = snapshot.created_at as Timestamp;
    const albums = snapshot?.albums || [];
    const features = snapshot?.features || [];
    const songs = snapshot?.songs || [];

    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      created_at: created_at || Timestamp.fromDate(new Date()),
      created_by: snapshot.created_by as DocumentReference,
      albums: albums as DocumentReference[],
      features: features as DocumentReference[],
      songs: songs as DocumentReference[]
    };
  }
});

export default artistConverter;
