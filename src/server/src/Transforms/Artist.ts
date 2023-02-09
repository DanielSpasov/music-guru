import { Artist } from '../Validations/Artist';

export default function transformArtist(artists: any[]): Artist[] {
  return artists.map(artist => {
    delete artist._doc.__v;
    delete artist._doc._id;
    return artist;
  });
}
