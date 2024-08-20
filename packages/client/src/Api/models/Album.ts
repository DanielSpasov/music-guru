import { AxiosRequestConfig } from 'axios';

import { Album, ListAlbum } from '../../Types';
import { get, post, patch } from '../requests';
import Crud from '../crud';

export default class AlbumsAPI extends Crud<Album, ListAlbum> {
  model = 'album';

  constructor() {
    super();
  }

  fetchTypes({ config }: { config?: AxiosRequestConfig } = { config: {} }) {
    return get({
      url: `${this.baseUrl}/${this.model}/types/`,
      config
    });
  }

  favorite(
    { uid, config }: { uid: string; config?: AxiosRequestConfig } = {
      uid: '',
      config: {}
    }
  ) {
    return post({
      url: `${this.baseUrl}/${this.model}/favorite/`,
      body: { uid },
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

  editors = {
    post: (
      {
        uid,
        editorsUids,
        config
      }: {
        uid: string;
        editorsUids: string[];
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        editorsUids: [],
        config: {}
      }
    ) => {
      return post({
        url: `${this.baseUrl}/${this.model}/${uid}/editor/`,
        body: { editorsUids },
        config
      });
    },
    patch: (
      {
        uid,
        editorsUids,
        config
      }: {
        uid: string;
        editorsUids: string[];
        config?: AxiosRequestConfig;
      } = {
        uid: '',
        editorsUids: [],
        config: {}
      }
    ) => {
      return patch({
        url: `${this.baseUrl}/${this.model}/${uid}/editor/`,
        body: { editorsUids },
        config
      });
    }
  };
}
