import { Artist, Song, UnpopulatedAlbum } from '../Types';
import { Serializer } from './helpers';

export class ListAlbum extends Serializer {
  uid: string;
  name: string;
  image: string;

  constructor(album: UnpopulatedAlbum) {
    super();

    this.uid = album.uid;
    this.name = album.name;
    this.image = album.image;
  }
}

export class DetailedAlbum extends Serializer {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: { uid: string };
  artist: Partial<Artist> | string;
  songs: Partial<Song>[] | string[];

  constructor(album: UnpopulatedAlbum) {
    super();

    this.uid = album.uid;
    this.name = album.name;
    this.image = album.image;
    this.created_at = album.created_at;
    this.created_by = { uid: album.created_by };
    this.artist = album.artist;
    this.songs = album.songs;
  }
}
