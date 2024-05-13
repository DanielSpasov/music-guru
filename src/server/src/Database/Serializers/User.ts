import { User } from '../Types';

export class ListUser {
  uid: string;
  username: string;

  constructor(user: User) {
    this.uid = user.uid;
    this.username = user.username;
  }
}
