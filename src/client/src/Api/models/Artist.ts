import { Artist } from '../../Pages/Artists/helpers';
import { applyPrefix } from '../helpers';
import Crud from '../crud';

export default class ArtistsAPI extends Crud<Artist> {
  model = 'artist';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }
}
