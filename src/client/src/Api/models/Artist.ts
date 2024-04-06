import { Artist } from '../../Pages/artists/helpers';
import { Config, applyPrefix } from '../helpers';
import { post } from '../requests';
import Crud from '../crud';

export default class ArtistsAPI extends Crud<Artist> {
  model = 'artist';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  favorite({ uid, config = {} }: { uid: string; config?: Config }) {
    return post({
      url: `${this.baseUrl}/${this.model}/favorite/`,
      body: { uid },
      config
    });
  }
}
