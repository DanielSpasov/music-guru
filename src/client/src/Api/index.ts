import UserAPI from './models/User';

export default class Api {
  static user: UserAPI = new UserAPI({});
}
