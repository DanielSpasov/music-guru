import Crud from '../crud';
import { User } from '../../Types/User';
import { applyPrefix } from '../helpers';
import { post } from '../requests';

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
}
