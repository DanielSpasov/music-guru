import { AxiosRequestConfig } from 'axios';

import { SignInData, SignUpData } from '../../Validations';
import { ListUser, User } from '../../Types/User';
import { get, patch, post } from '../requests';
import { Body } from '../types';
import Crud from '../crud';

export default class UserAPI extends Crud<User, ListUser> {
  model = 'user';

  constructor() {
    super();
  }

  patch(
    {
      id,
      field,
      body = {},
      config = {}
    }: {
      id: string;
      field: keyof User;
      body: Body;
      config?: AxiosRequestConfig;
    } = {
      id: '',
      field: 'username',
      body: {},
      config: {}
    }
  ): Promise<{ data: User }> {
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
