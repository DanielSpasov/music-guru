import { AxiosRequestConfig } from 'axios';

import { Editors, Favorite } from '../services';
import { Album, ListAlbum } from '../../Types';
import { get, post } from '../requests';
import Crud from '../crud';

export default class AlbumsAPI extends Crud<Album, ListAlbum> {
  model = 'album';

  editors = new Editors(this.model);
  favorite = new Favorite(this.model).favorite;

  constructor() {
    super();
  }

  fetchTypes({ config }: { config?: AxiosRequestConfig } = { config: {} }) {
    return get({
      url: `${this.baseUrl}/${this.model}/types/`,
      config
    });
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
