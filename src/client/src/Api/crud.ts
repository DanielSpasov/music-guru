import { get, post, put, patch, del } from './requests';

export class CrudBase {
  baseUrl: string;
  model!: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_API_URL || '';
  }
}

type Get = { id: string; config?: any };
type Fetch = { config?: any };
type Post = { body: any; config?: any };
type Patch = { id: string; body: any; config?: any };
type Del = { id: string; config?: any };
type Put = { id: string; body: any; config?: any };

export default class Crud<T> extends CrudBase {
  get({ id, config = {} }: Get): Promise<{ data: T }> {
    return get({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  fetch({ config = {} }: Fetch): Promise<{ data: T[] }> {
    return get({ url: `${this.baseUrl}/${this.model}/`, config });
  }

  post({ body = {}, config = {} }: Post): Promise<T> {
    return post({ url: `${this.baseUrl}/${this.model}/`, body, config });
  }

  patch({ id, body = {}, config = {} }: Patch): Promise<{ data: T }> {
    return patch({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }

  del({ id, config = {} }: Del): Promise<T> {
    return del({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  put({ id, body = {}, config = {} }: Put): Promise<T> {
    return put({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }
}
