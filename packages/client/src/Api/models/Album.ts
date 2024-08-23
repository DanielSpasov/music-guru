import { AxiosRequestConfig } from 'axios';

import { del, get, patch, post, put } from '../requests';
import { Editors, Favorite } from '../services';
import { Album, ListAlbum } from '../../Types';
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
    },
    put: (
      {
        uid,
        disc,
        songs,
        config
      }: {
        uid: string;
        disc: number;
        songs: { number: number; uid: string }[];
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        disc: 0,
        songs: [],
        config: {}
      }
    ) => {
      return put({
        url: `${this.baseUrl}/${this.model}/${uid}/song/`,
        body: { songs, disc },
        config
      });
    },
    fetch: (
      {
        uid,
        config
      }: {
        uid: string;
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        config: {}
      }
    ) => {
      return get({
        url: `${this.baseUrl}/${this.model}/${uid}/song/`,
        config
      });
    }
  };

  discs = {
    del: (
      {
        uid,
        number,
        config
      }: {
        uid: string;
        number: number;
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        number: 0,
        config: {}
      }
    ) => {
      return del({
        url: `${this.baseUrl}/${this.model}/${uid}/disc/${number}/`,
        config
      });
    }
  };
}
