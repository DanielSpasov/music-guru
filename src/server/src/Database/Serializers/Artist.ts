import { UnpopulatedArtist } from '../Types';
import { Serializer } from './helpers';

export class ListArtist extends Serializer {
  uid: string;
  name: string;
  image: string;

  constructor(artist: UnpopulatedArtist) {
    super();

    this.uid = artist.uid;
    this.name = artist.name;
    this.image = artist.image;
  }
}

export class DetailedArtist extends Serializer {
  uid: string;
  name: string;
  image: string;
  created_at: Date;
  created_by: { uid: string };

  constructor(artist: UnpopulatedArtist) {
    super();

    this.uid = artist.uid;
    this.name = artist.name;
    this.image = artist.image;
    this.created_at = artist.created_at;
    this.created_by = { uid: artist.created_by };
  }
}
