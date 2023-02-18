import { User } from '../Validations/User';

export default function transformUser({ _doc: user }: any): User {
  delete user.__v;
  delete user._id;
  delete user.password;
  return user;
}
