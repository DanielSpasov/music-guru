import { Album, Artist, UnpopulatedSong } from '../Types';
import { Serializer } from './helpers';

export class ListSong extends Serializer {
  uid: string;
  name: string;
  image: string;

  constructor(song: UnpopulatedSong) {
    super();

    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image;
  }
}

export class DetailedSong extends Serializer {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: { uid: string };
  release_date: Date;
  artist: Partial<Artist> | string;
  albums: Partial<Album>[] | string[];
  features: Partial<Artist>[] | string[];

  constructor(song: UnpopulatedSong) {
    super();

    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image;
    this.created_at = song.created_at;
    this.created_by = { uid: song.created_by };
    this.release_date = song.release_date;
    this.artist = song.artist;
    this.albums = song.albums;
    this.features = song.features;
  }
}
