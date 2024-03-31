import { Artist } from '../Types';

export class ListArtist {
  uid: string;
  name: string;
  image: string;

  constructor(artist: Artist) {
    this.uid = artist.uid;
    this.name = artist.name;
    this.image = artist.image;
  }
}

export class DetailedArtist {
  uid: string;
  name: string;
  bio: string;
  image: string;
  created_at: Date;
  created_by: string;

  constructor(artist: Artist) {
    this.uid = artist.uid;
    this.name = artist.name;
    this.bio = artist.bio;
    this.image = artist.image;
    this.created_at = artist.created_at;
    this.created_by = artist.created_by.uid;
  }
}
