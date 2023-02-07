import { SignInData, SignUpData, User } from '../../Pages/Auth/helpers';
import { applyPrefix } from '../helpers';
import { get, post } from '../requests';
import Crud from '../crud';

export default class UserAPI extends Crud<User> {
  model = 'user';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  signUp(user: SignUpData) {
    return post({
      url: `${this.baseUrl}/${this.model}/sign-up`,
      body: user
    });
  }

  signIn(user: SignInData) {
    return post({
      url: `${this.baseUrl}/${this.model}/sign-in`,
      body: user
    });
  }

  validateToken(token: string) {
    return get({
      url: `${this.baseUrl}/${this.model}/validate-jwt`,
      config: { headers: { Authorization: token } }
    });
  }
}
