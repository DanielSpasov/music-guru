import { serializers } from '.';

import { DBAlbum, AlbumType } from '../Types';
import { ListArtist } from './Artist';
import { ListSong } from './Song';

export class ListAlbum {
  uid: string;
  name: string;
  image: string;
  release_date: Date | null;
  type: AlbumType;
  favorites: number;

  constructor(album: DBAlbum) {
    this.uid = album.uid;
    this.name = album.name;
    this.type = album.type;
    this.image = album.image;
    this.favorites = album.favorites;
    this.release_date = album.release_date;
  }
}

export class DetailedAlbum {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  release_date: Date | null;
  created_by: string;
  artist: ListArtist;
  songs: ListSong[];
  type: AlbumType;
  favorites: number;

  constructor(album: DBAlbum) {
    this.uid = album.uid;
    this.name = album.name;
    this.image = album.image;
    this.favorites = album.favorites;
    this.created_at = album.created_at;
    this.release_date = album.release_date;
    this.created_by = album.created_by.uid;
    this.artist = serializers.artists.list(album.artist);
    this.songs = album.songs.map(serializers.songs.list);
    this.type = album.type;
  }
}
