import { FirestoreDataConverter, Timestamp } from 'firebase/firestore/lite';

import { Album, DBAlbum } from '../Types';

const albumConverter: FirestoreDataConverter<Partial<Album>, DBAlbum> = {
  fromFirestore: snapshot => {
    const album = snapshot.data();
    return {
      uid: snapshot.id,
      name: album.name,
      image: album.image,
      artist: album.artist,
      created_at: album.created_at.toDate(),
      release_date: album.release_date.toDate(),
      created_by: album.created_by,
      songs: album.songs
    };
  },
  toFirestore: snapshot => {
    const created_at = snapshot.created_at as Timestamp;

    return {
      name: String(snapshot.name),
      image: String(snapshot.image),
      created_at: created_at || Timestamp.fromDate(new Date()),
      release_date: Timestamp.fromDate(
        (snapshot?.release_date as Date) || new Date()
      ),
      created_by: String(snapshot.created_by),
      artist: String(snapshot.artist),
      songs: snapshot.songs
        ? (snapshot.songs as string[]).map(x => String(x))
        : []
    };
  }
};

export default albumConverter;
