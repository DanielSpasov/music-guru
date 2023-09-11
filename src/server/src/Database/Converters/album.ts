import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Album, DBAlbum } from '../Types';

const albumConverter: FirestoreDataConverter<Partial<Album>, DBAlbum> = {
  fromFirestore: snapshot => {
    const album = snapshot.data();
    return {
      uid: snapshot.id,
      name: album.name,
      image: album.image,
      artist: snapshot.get('artist').id,
      created_at: album.created_at.toDate(),
      created_by: snapshot.get('created_by').id,
      songs: snapshot.get('songs').map((x: DocumentReference) => x.id)
    };
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
