import { AxiosRequestConfig } from 'axios';

import { Editors, Favorite } from '../services';
import { Album, ListAlbum } from '../../Types';
import { get, patch, post } from '../requests';
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

  songs = {
    post: (
      {
        uid,
        disc,
        songs,
        config
      }: {
        uid: string;
        disc: number;
        songs: string[];
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        disc: 0,
        songs: [],
        config: {}
      }
    ) => {
      return post({
        url: `${this.baseUrl}/${this.model}/${uid}/song/`,
        body: { songs, disc },
        config
      });
    },
    patch: (
      {
        uid,
        disc,
        songs,
        config
      }: {
        uid: string;
        disc: number;
        songs: string[];
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        disc: 0,
        songs: [],
        config: {}
      }
    ) => {
      return patch({
        url: `${this.baseUrl}/${this.model}/${uid}/song/`,
        body: { songs, disc },
        config
      });
    }
  };
}
