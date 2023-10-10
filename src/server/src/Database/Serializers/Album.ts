import { Album } from '../Types';

export class ListAlbum {
  uid: string;
  name: string;
  image: string;

  constructor(album: Album) {
    this.uid = album.uid;
    this.name = album.name;
    this.image = album.image;
  }
}

export class DetailedAlbum {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: string;
  artist: string;
  songs: string[];

  constructor(album: Album) {
    this.uid = album.uid;
    this.name = album.name;
    this.image = album.image;
    this.created_at = album.created_at;
    this.created_by = album.created_by;
    this.artist = album.artist;
    this.songs = album.songs;
  }
}
