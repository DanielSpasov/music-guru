import { Single } from '../../Pages/singles/helpers';
import { applyPrefix } from '../helpers';
import Crud from '../crud';

export default class SinglesAPI extends Crud<Single> {
  model = 'single';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }
}
