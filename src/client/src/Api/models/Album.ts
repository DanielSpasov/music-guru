import { Album } from '../../Pages/albums/helpers';
import { applyPrefix } from '../helpers';
import Crud from '../crud';

export default class AlbumsAPI extends Crud<Album> {
  model = 'album';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }
}
