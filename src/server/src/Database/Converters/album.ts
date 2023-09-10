import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Album, ConvertType, DBAlbum } from '../Types';
import { getDataByType } from './helpers';

const albumConverter = (
  ct: ConvertType
): FirestoreDataConverter<Album, DBAlbum> => ({
  fromFirestore: async snapshot => {
    const album = snapshot.data();
    return Promise.resolve({
      uid: snapshot.id,
      name: album.name,
      image: album.image,
      created_at: album.created_at.toDate(),
      created_by: await getDataByType<Album>(ct, album, 'created_by'),
      songs: await getDataByType<Album>(ct, album, 'songs'),
      artist: await getDataByType<Album>(ct, album, 'artist')
    });
  },
  toFirestore: snapshot => {
    const created_at = snapshot.created_at as Timestamp;
    const songs = snapshot?.songs || [];

    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      created_at: created_at || Timestamp.fromDate(new Date()),
      created_by: snapshot.created_by as DocumentReference,
      artist: snapshot.artist as DocumentReference,
      songs: songs as DocumentReference[]
    };
  }
});

export default albumConverter;
