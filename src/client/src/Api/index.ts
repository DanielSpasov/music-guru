import ArtistsAPI from './models/Artist';
import SinglesAPI from './models/Single';
import AlbumsAPI from './models/Album';
import UserAPI from './models/User';

export default class Api {
  static user: UserAPI = new UserAPI({});
  static artists: ArtistsAPI = new ArtistsAPI({});
  static singles: SinglesAPI = new SinglesAPI({});
  static albums: AlbumsAPI = new AlbumsAPI({});
}
