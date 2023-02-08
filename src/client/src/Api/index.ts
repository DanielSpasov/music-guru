import ArtistsAPI from './models/Artist';
import UserAPI from './models/User';

export default class Api {
  static user: UserAPI = new UserAPI({});
  static artists: ArtistsAPI = new ArtistsAPI({});
}
