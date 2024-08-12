import { DBArtist } from '../Types';

export class ListArtist {
  uid: string;
  name: string;
  image: string;
  favorites: number;

  constructor(artist: DBArtist) {
    this.uid = artist.uid;
    this.name = artist.name;
    this.image = artist.image;
    this.favorites = artist.favorites;
  }
}

export class DetailedArtist {
  uid: string;
  name: string;
  about: string;
  image: string;
  created_at: Date;
  created_by: string;
  favorites: number;
  links: { name: string; url: string }[];

  constructor(artist: DBArtist) {
    this.uid = artist.uid;
    this.name = artist.name;
    this.about = artist.about;
    this.image = artist.image;
    this.created_at = artist.created_at;
    this.created_by = artist.created_by.uid;
    this.favorites = artist.favorites;
    this.links = artist.links;
  }
}
