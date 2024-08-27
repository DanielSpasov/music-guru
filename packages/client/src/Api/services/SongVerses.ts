import { AxiosRequestConfig } from 'axios';

import { del, patch, post } from '../requests';
import { Verse } from '../../Types';
import { CrudBase } from '../crud';
import { Body } from '../types';

export class SongVerses extends CrudBase {
  constructor() {
    super();
  }

  del(
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
  ) {
    return del({
      url: `${this.baseUrl}/song/${uid}/verse/${number}/`,
      config
    });
  }

  post(
    {
      uid,
      payload,
      config
    }: {
      uid: string;
      payload: Body;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      payload: {},
      config: {}
    }
  ) {
    return post({
      url: `${this.baseUrl}/song/${uid}/verse/`,
      body: payload,
      config
    });
  }

  patch(
    {
      uid,
      number,
      verse,
      config
    }: {
      uid: string;
      number: number;
      verse: Verse;
      config?: AxiosRequestConfig;
    } = {
      uid: '',
      number: 0,
      verse: { lyrics: '', number: 0, title: '' },
      config: {}
    }
  ) {
    return patch({
      url: `${this.baseUrl}/song/${uid}/verse/${number}/`,
      body: { verse },
      config
    });
  }
}
