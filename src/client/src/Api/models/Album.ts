import { Album, ListAlbum } from '../../Types/Album';
import { Config, applyPrefix } from '../helpers';
import { get, post } from '../requests';
import Crud from '../crud';

export default class AlbumsAPI extends Crud<Album, ListAlbum> {
  model = 'album';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  fetchTypes({ config }: { config?: Config }) {
    return get({
      url: `${this.baseUrl}/${this.model}/types/`,
      config
    });
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
