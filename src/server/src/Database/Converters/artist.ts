import {
  DocumentReference,
  FirestoreDataConverter,
  Timestamp
} from 'firebase/firestore/lite';

import { getRefData } from '../../Controllers/helpers/helpers';
import { Artist, DBArtist } from '../Types';

const artistConverter: FirestoreDataConverter<Artist, DBArtist> = {
  fromFirestore: async snapshot => {
    const artist = snapshot.data();
    return Promise.resolve({
      uid: snapshot.id,
      name: artist.name,
      image: artist.image,
      created_at: artist.created_at.toDate(),
      created_by: await getRefData(artist.created_by),
      songs: await Promise.all(artist.songs.map(getRefData)),
      albums: await Promise.all(artist.albums.map(getRefData)),
      features: await Promise.all(artist.features.map(getRefData))
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
};

export default artistConverter;
