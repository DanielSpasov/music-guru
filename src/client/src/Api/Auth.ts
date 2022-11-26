import Crud from './crud';

export default class Auth extends Crud {
  baseUrl = 'https://swapi.dev/api/';

  signUp(data: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }) {
    return this.get(`${this.baseUrl}/people/1`);
  }
}
