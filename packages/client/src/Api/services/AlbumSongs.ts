import { AxiosRequestConfig } from 'axios';

import { CrudBase } from '../crud';
import { get, patch, post, put } from '../requests';

export class AlbumSongs extends CrudBase {
  constructor() {
    super();
  }

  fetch(
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
  ) {
    return get({
      url: `${this.baseUrl}/album/${uid}/song/`,
      config
    });
  }

  put(
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
  ) {
    return put({
      url: `${this.baseUrl}/album/${uid}/song/`,
      body: { songs, disc },
      config
    });
  }

  patch(
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
  ) {
    return patch({
      url: `${this.baseUrl}/album/${uid}/song/`,
      body: { songs, disc },
      config
    });
  }

  post(
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
  ) {
    return post({
      url: `${this.baseUrl}/album/${uid}/song/`,
      body: { songs, disc },
      config
    });
  }
}
