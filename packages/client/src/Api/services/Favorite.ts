import { AxiosRequestConfig } from 'axios';

import { CrudBase } from '../crud';
import { post } from '../requests';

export class Favorite extends CrudBase {
  model: string;

  constructor(model: string) {
    super();
    this.model = model;
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
}
