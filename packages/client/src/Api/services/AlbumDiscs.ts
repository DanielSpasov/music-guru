import { AxiosRequestConfig } from 'axios';

import { CrudBase } from '../crud';
import { del } from '../requests';

export class AlbumDiscs extends CrudBase {
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
      url: `${this.baseUrl}/album/${uid}/disc/${number}/`,
      config
    });
  }
}
