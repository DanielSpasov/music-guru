import { get, post, put, patch, del } from './requests';

export class CrudBase {
  baseUrl: string;
  model!: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_API_URL || '';
  }
}

export default class Crud<T, K> extends CrudBase {
  get({ id, config = {} }: { id: string; config?: any }): Promise<{ data: T }> {
    return get({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  fetch({ config = {} }: { config?: any }): Promise<{ data: K[] }> {
    return get({ url: `${this.baseUrl}/${this.model}/`, config });
  }

  post({ body = {}, config = {} }: { body: any; config?: any }): Promise<T> {
    return post({ url: `${this.baseUrl}/${this.model}/`, body, config });
  }

  patch({
    id,
    body = {},
    config = {}
  }: {
    id: string;
    body: any;
    config?: any;
  }): Promise<{ data: T }> {
    return patch({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }

  del({ id, config = {} }: { id: string; config?: any }): Promise<{ data: T }> {
    return del({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  put({
    id,
    body = {},
    config = {}
  }: {
    id: string;
    body: any;
    config?: any;
  }): Promise<{ data: T }> {
    return put({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }
}
