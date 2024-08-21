import { AxiosRequestConfig } from 'axios';

import { patch, post } from '../requests';
import { CrudBase } from '../crud';

export class Editors extends CrudBase {
  model: string;

  constructor(model: string) {
    super();
    this.model = model;
  }

  post(
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
  ) {
    return post({
      url: `${this.baseUrl}/${this.model}/${uid}/editor/`,
      body: { editorsUids },
      config
    });
  }

  patch(
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
  ) {
    return patch({
      url: `${this.baseUrl}/${this.model}/${uid}/editor/`,
      body: { editorsUids },
      config
    });
  }
}
