import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { Song, DBSong, Serializer } from '../Types';

const songConverter = (
  serializer?: Serializer
): FirestoreDataConverter<Partial<Song>, DBSong> => ({
  fromFirestore: snapshot => {
    const song = snapshot.data();
    switch (serializer) {
      case 'list':
        return {
          uid: snapshot.id,
          name: song.name,
          image: song.image
        };
      case 'detailed':
        return {
          uid: snapshot.id,
          name: song.name,
          image: song.image,
          release_date: song.release_date.toDate(),
          created_at: song.created_at.toDate(),
          created_by: { uid: snapshot.get('created_by').id },
          artist: { uid: snapshot.get('artist').id },
          albums: snapshot
            .get('albums')
            .map((x: DocumentReference) => ({ uid: x.id })),
          features: snapshot
            .get('features')
            .map((x: DocumentReference) => ({ uid: x.id }))
        };
      default:
        return song;
    }
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
