import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Album, Serializer, DBAlbum } from '../Types';

const albumConverter = (
  serializer?: Serializer
): FirestoreDataConverter<Partial<Album>, DBAlbum> => ({
  fromFirestore: snapshot => {
    const album = snapshot.data();
    switch (serializer) {
      case 'list':
        return {
          uid: snapshot.id,
          name: album.name,
          image: album.image
        };
      case 'detailed':
        return {
          uid: snapshot.id,
          name: album.name,
          image: album.image,
          created_at: album.created_at.toDate(),
          created_by: { uid: snapshot.get('created_by').id },
          artist: { uid: snapshot.get('artist').id },
          songs: snapshot
            .get('songs')
            .map((x: DocumentReference) => ({ uid: x.id }))
        };
      default:
        return album;
    }
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
