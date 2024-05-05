import { Config, applyPrefix } from '../helpers';
import { del, post } from '../requests';
import { Song } from '../../Types/Song';
import Crud from '../crud';

export default class SongsAPI extends Crud<Song> {
  model = 'song';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
  }

  addVerse({
    uid,
    payload,
    config
  }: {
    uid: string;
    payload: any;
    config?: Config;
  }) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/`,
      body: payload,
      config
    });
  }

  delVerse({
    uid,
    number,
    config = {}
  }: {
    uid: string;
    number: number;
    config?: Config;
  }) {
    return del({
      url: `${this.baseUrl}/${this.model}/${uid}/verse/`,
      config: {
        params: { number, ...config?.params },
        ...config
      }
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
