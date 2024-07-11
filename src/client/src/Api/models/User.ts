import { AxiosRequestConfig } from 'axios';

import { SignInData, SignUpData } from '../../Validations';
import { get, patch, post } from '../requests';
import { ListUser, User } from '../../Types';
import Crud from '../crud';

export default class UserAPI extends Crud<User, ListUser> {
  model = 'user';

  constructor() {
    super();
  }

  changeUsername(
    {
      id,
      body,
      config
    }: {
      id: string;
      body: { username?: string };
      config?: AxiosRequestConfig;
    } = {
      id: '',
      body: {},
      config: {}
    }
  ): Promise<{ data: User }> {
    return patch({
      url: `${this.baseUrl}/${this.model}/${id}/username`,
      body,
      config
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
