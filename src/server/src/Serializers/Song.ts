import { serializers } from '.';

import { DBSong, Verse } from '../Types/Song';
import { ListArtist } from './Artist';

export class ListSong {
  uid: string;
  name: string;
  image: string;
  artist: ListArtist;
  favorites: number;

  constructor(song: DBSong) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
    this.artist = new ListArtist(song.artist);
    this.favorites = song.favorites;
  }
}

export class DetailedSong {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date | null;
  artist: ListArtist;
  features: ListArtist[];
  verses: Verse[];
  about: string;
  links: { name: string; url: string }[];
  editors: string[];
  favorites: number;

  constructor(song: DBSong) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
    this.created_at = song.created_at;
    this.created_by = song.created_by.uid;
    this.release_date = song.release_date;
    this.artist = serializers.artists.list(song.artist);
    this.features = song.features.map(serializers.artists.list);
    this.verses = song.verses;
    this.links = song.links;
    this.about = song.about;
    this.editors = song.editors.map(x => x.uid);
    this.favorites = song.favorites;
  }
}
