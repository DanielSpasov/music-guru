import { User } from '../Types';

export class ListUser {
  uid: string;
  username: string;
  email: string;
  created_at: Date;

  constructor(user: User) {
    this.uid = user.uid;
    this.username = user.username;
    this.email = user.email;
    this.created_at = user.created_at;
  }
}
