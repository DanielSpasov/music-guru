import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Album, DBAlbum } from '../../Types';

const albumConverter: FirestoreDataConverter<Album, DBAlbum> = {
  fromFirestore: snapshot => {
    const album = snapshot.data();
    return {
      uid: snapshot.id,
      name: album.name,
      image: album.image,
      created_at: album.created_at.toDate(),
      created_by: {},
      songs: [],
      artist: {}
    };
  },
  toFirestore: snapshot => {
    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      created_at: Timestamp.fromDate(
        (snapshot?.created_at as Date) || new Date()
      ),
      created_by: snapshot.created_by as DocumentReference,
      artist: snapshot.artist as DocumentReference,
      songs: snapshot.songs as DocumentReference[]
    };
  }
};

export default albumConverter;
