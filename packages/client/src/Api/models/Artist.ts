import { AxiosRequestConfig } from 'axios';

import { Artist, ListArtist } from '../../Types';
import { patch, post } from '../requests';
import Crud from '../crud';

export default class ArtistsAPI extends Crud<Artist, ListArtist> {
  model = 'artist';

  constructor() {
    super();
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
