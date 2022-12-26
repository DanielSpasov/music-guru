import { get, post, put, patch, del } from './requests';

export class CrudBase {
  baseUrl: string;
  model!: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || '';
  }
}

export default class Crud<T> extends CrudBase {
  get({ id = '0', config = {} }): Promise<T> {
    return get({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  fetch({ config = {} }): Promise<T> {
    return get({ url: `${this.baseUrl}/${this.model}/`, config });
  }

  post({ body = {}, config = {} }): Promise<T> {
    return post({ url: `${this.baseUrl}/${this.model}/`, body, config });
  }

  patch({ id = '0', body = {}, config = {} }): Promise<T> {
    return patch({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }

  del({ id = '0', config = {} }): Promise<T> {
    return del({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  put({ id = '0', body = {}, config = {} }): Promise<T> {
    return put({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }
}
