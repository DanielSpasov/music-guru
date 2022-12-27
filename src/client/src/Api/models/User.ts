import Crud from '../crud';
import { User } from '../../Types/User';
import { applyPrefix } from '../helpers';
import { get, post } from '../requests';

export default class UserAPI extends Crud<User> {
  model = 'user';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  signUp(user: any) {
    return post({
      url: `${this.baseUrl}/${this.model}/sign-up`,
      body: user
    });
  }

  validateToken(token: string) {
    return get({
      url: `${this.baseUrl}/${this.model}/validate-jwt`,
      config: {
        params: {
          token
        }
      }
    });
  }
}
