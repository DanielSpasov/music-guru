import Crud from '../crud';
import { User } from '../../Types/User';
import { applyPrefix } from '../helpers';

export default class UserAPI extends Crud<User> {
  model = 'user';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }
}
