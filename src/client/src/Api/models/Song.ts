import { Song } from '../../Pages/songs/helpers';
import { Config, applyPrefix } from '../helpers';
import { post } from '../requests';
import Crud from '../crud';

export default class SongsAPI extends Crud<Song> {
  model = 'song';

  constructor(props: any) {
    super();
    applyPrefix(this, props);
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
