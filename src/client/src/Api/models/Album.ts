import { Album } from '../../Pages/albums/helpers';
import { Config, applyPrefix } from '../helpers';
import { get } from '../requests';
import Crud from '../crud';

export default class AlbumsAPI extends Crud<Album> {
  model = 'album';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  async fetchTypes({ config }: { config?: Config }) {
    return get({
      url: `${this.baseUrl}/${this.model}/types/`,
      config
    });
  }
}
