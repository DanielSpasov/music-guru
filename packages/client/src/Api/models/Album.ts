import { AxiosRequestConfig } from 'axios';

import { Editors, Favorite, AlbumSongs, AlbumDiscs } from '../services';
import { Album, ListAlbum } from '../../Types';
import { get, post } from '../requests';
import Crud from '../crud';

export default class AlbumsAPI extends Crud<Album, ListAlbum> {
  model = 'album';

  favorite = new Favorite(this.model).favorite;
  editors = new Editors(this.model);
  songs = new AlbumSongs();
  discs = new AlbumDiscs();

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
