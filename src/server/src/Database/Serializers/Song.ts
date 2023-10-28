import { doc, getDoc } from 'firebase/firestore/lite';
import { Song } from '../Types';

import db from '../';

export class ListSong {
  uid: string;
  name: string;
  image: string;
  artist: string;

  constructor(song: Song) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
    this.artist = song.artist;
  }

  async fetchArtist() {
    const snapshot = await getDoc(doc(db, 'artists', this.artist));
    this.artist = snapshot.get('name');
  }
}

export class DetailedSong {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date | null;
  artist: string;
  features: string[];

  constructor(song: Song) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
    this.created_at = song.created_at;
    this.created_by = song.created_by;
    this.release_date = song.release_date;
    this.artist = song.artist;
    this.features = song.features;
  }
}
