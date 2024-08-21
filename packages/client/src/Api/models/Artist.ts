import { AxiosRequestConfig } from 'axios';

import { Artist, ListArtist } from '../../Types';
import { Editors, Favorite } from '../services';
import { post } from '../requests';
import Crud from '../crud';

export default class ArtistsAPI extends Crud<Artist, ListArtist> {
  model = 'artist';

  editors = new Editors(this.model);
  favorite = new Favorite(this.model).favorite;

  constructor() {
    super();
  }

  updateImage(
    {
      uid,
      image,
      config
    }: {
      uid: string;
      image: File;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      image: new File(['image.jpg'], 'image.jpg'),
      config: {}
    }
  ) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/image/`,
      body: { image },
      config
    });
  }
}
