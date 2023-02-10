import { Artist } from '../Validations/Artist';

export default function transformArtist(artist: any): Artist {
  delete artist._doc.__v;
  delete artist._doc._id;
  return artist;
}
