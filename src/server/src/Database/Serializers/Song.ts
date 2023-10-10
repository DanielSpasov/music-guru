import { Song } from '../Types';

export class ListSong {
  uid: string;
  name: string;
  image: string;

  constructor(song: Song) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
  }
}

export class DetailedSong {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date;
  artist: string;
  albums: string[];
  features: string[];

  constructor(song: Song) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
    this.created_at = song.created_at;
    this.created_by = song.created_by;
    this.release_date = song.release_date;
    this.artist = song.artist;
    this.albums = song.albums;
    this.features = song.features;
  }
}
