import { defaultArtist } from '../../Pages/artists/details';
import { Song } from '../../Types';

export const defaultSong: Song = {
  uid: '',
  created_at: new Date(),
  created_by: '',
  features: [],
  image: '',
  name: '',
  release_date: null,
  artist: defaultArtist,
  verses: [],
  links: [],
  about: '',
  editors: [],
  favorites: 0
};
