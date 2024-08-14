import { get, post, put, patch, del } from '../requests';
import {
  DelProps,
  FetchProps,
  GetProps,
  Pagination,
  PatchProps,
  PostProps,
  PutProps
} from './types';
import {
  delValues,
  fetchValues,
  getValues,
  patchValues,
  postValues,
  putValues
} from './defaultValues';

export class CrudBase {
  baseUrl: string;
  model!: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_API_URL || '';
  }
}

export default class Crud<T, K> extends CrudBase {
  get({ id, config }: GetProps = getValues): Promise<{ data: T }> {
    return get({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  fetch({ config }: FetchProps = fetchValues): Promise<{
    data: K[];
    pagination: Pagination;
  }> {
    return get({ url: `${this.baseUrl}/${this.model}/`, config });
  }

  post({ body, config }: PostProps = postValues): Promise<{ data: T }> {
    return post({ url: `${this.baseUrl}/${this.model}/`, body, config });
  }

  patch({ id, body, config }: PatchProps = patchValues): Promise<{ data: T }> {
    return patch({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }

  del({ id, config }: DelProps = delValues): Promise<{ data: T }> {
    return del({ url: `${this.baseUrl}/${this.model}/${id}/`, config });
  }

  put({ id, body, config }: PutProps = putValues): Promise<{ data: T }> {
    return put({ url: `${this.baseUrl}/${this.model}/${id}/`, body, config });
  }
}
