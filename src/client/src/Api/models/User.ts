import { SignInData, SignUpData, User } from '../../Pages/auth/helpers';
import { applyPrefix } from '../helpers';
import { get, patch, post } from '../requests';
import Crud from '../crud';

export default class UserAPI extends Crud<User, User> {
  model = 'user';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  patch({
    id,
    field,
    body = {},
    config = {}
  }: {
    id: string;
    field: keyof User;
    body: any;
    config?: any;
  }): Promise<{ data: User }> {
    return patch({
      url: `${this.baseUrl}/${this.model}/${id}/`,
      body,
      config: {
        params: { field, ...config?.params },
        ...config
      }
    });
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
      config: { params: { token } }
    });
  }

  reSendValidationEmail() {
    return get({
      url: `${this.baseUrl}/${this.model}/resend-validation-email`
    });
  }

  validateEmail(id: string) {
    return post({
      url: `${this.baseUrl}/${this.model}/validate-email`,
      body: { id }
    });
  }
}
