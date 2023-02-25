import ArtistsAPI from './models/Artist';
import SongsAPI from './models/Song';
import AlbumsAPI from './models/Album';
import UserAPI from './models/User';

export default class Api {
  static user: UserAPI = new UserAPI({});
  static artists: ArtistsAPI = new ArtistsAPI({});
  static songs: SongsAPI = new SongsAPI({});
  static albums: AlbumsAPI = new AlbumsAPI({});
}
