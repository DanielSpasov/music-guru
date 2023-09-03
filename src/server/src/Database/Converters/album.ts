import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Album, DBAlbum } from '../Types';
import { getRefData } from '../../Controllers/helpers/helpers';

const albumConverter: FirestoreDataConverter<Album, DBAlbum> = {
  fromFirestore: async snapshot => {
    const album = snapshot.data();
    return Promise.resolve({
      uid: snapshot.id,
      name: album.name,
      image: album.image,
      created_at: album.created_at.toDate(),
      created_by: await getRefData(album.created_by),
      songs: await Promise.all(album.songs.map(getRefData)),
      artist: await getRefData(album.artist)
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
};

export default albumConverter;
