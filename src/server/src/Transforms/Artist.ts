import { Artist } from '../Validations/Artist';

export default function transformArtist({ _doc: artist }: any): Artist {
  delete artist.__v;
  delete artist._id;
  return artist;
}
