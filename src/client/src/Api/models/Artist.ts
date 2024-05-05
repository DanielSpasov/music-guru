import { Artist, ListArtist } from '../../Types/Artist';
import { Config, applyPrefix } from '../helpers';
import { post } from '../requests';
import Crud from '../crud';

export default class ArtistsAPI extends Crud<Artist, ListArtist> {
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

  updateImage({
    uid,
    image,
    config = {}
  }: {
    uid: string;
    image: File;
    config?: Config;
  }) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/image/`,
      body: { image },
      config
    });
  }
}
