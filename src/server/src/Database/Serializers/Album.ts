import { Album } from '../Types';

export class ListAlbum {
  uid: string;
  name: string;
  image: string;
  release_date: Date | null;
  type: {
    code: string;
    name: string;
  };

  constructor(album: Album) {
    this.uid = album.uid;
    this.name = album.name;
    this.type = album.type;
    this.image = album.image;
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
  artist: string;
  songs: string[];
  type: {
    code: string;
    name: string;
  };

  constructor(album: Album) {
    this.uid = album.uid;
    this.name = album.name;
    this.image = album.image;
    this.created_at = album.created_at;
    this.release_date = album.release_date;
    this.created_by = album.created_by;
    this.artist = album.artist;
    this.songs = album.songs;
    this.type = album.type;
  }
}
