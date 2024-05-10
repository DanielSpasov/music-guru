import { serializers } from '.';
import { Artist, Song } from '../Types';
import { Verse } from '../Types/Song';

export class ListSong {
  uid: string;
  name: string;
  image: string;
  artist: string;

  constructor(song: Song) {
    this.uid = song.uid;
    this.name = song.name;
    this.image = song.image || '';
    this.artist = song.artist.name;
  }
}

export class DetailedSong {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: string;
  release_date: Date | null;
  artist: Artist;
  features: Artist[];
  verses: Verse[];
  links: { name: string; url: string }[];

  constructor(song: Song) {
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
  }
}
