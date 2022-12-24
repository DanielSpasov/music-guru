import axios from 'axios';

import { devLog } from './helpers';

type Config = {
  headers?: { [key: string]: any };
  params?: { [key: string]: any };
};

export class CrudBase {
  baseUrl: string;
  model!: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || '';
  }
}

export default class Crud<T> extends CrudBase {
  async get({
    id = '0',
    config = {}
  }: {
    id: string;
    config?: Config;
  }): Promise<T> {
    const url = `${this.baseUrl}/${this.model}/${id}/`;
    const res = await axios.get(url, config);
    devLog('GET', url, res.data);
    return res.data;
  }

  async fetch({ config = {} }: { config?: Config }) {
    const url = `${this.baseUrl}/${this.model}/`;
    const res = await axios.get(url, config);
    devLog('FETCH', url, res.data);
    return res.data;
  }

  async post({
    body = {},
    config = {}
  }: {
    body: any;
    config?: Config;
  }): Promise<T> {
    const url = `${this.baseUrl}/${this.model}/`;
    const res = await axios.post(url, body, config);
    devLog('POST', url, res.data);
    return res.data;
  }

  async patch({
    id = '0',
    body = {},
    config = {}
  }: {
    id: string;
    body: any;
    config?: Config;
  }): Promise<T> {
    const url = `${this.baseUrl}/${this.model}/${id}/`;
    const res = await axios.patch(url, body, config);
    devLog('PATCH', url, res.data);
    return res.data;
  }

  async del({
    id = '0',
    config = {}
  }: {
    id: string;
    config?: Config;
  }): Promise<T> {
    const url = `${this.baseUrl}/${this.model}/${id}/`;
    const res = await axios.delete(url, config);
    devLog('DELETE', url, res.data);
    return res.data;
  }

  async put({
    id = '0',
    body = {},
    config = {}
  }: {
    id: string;
    body: any;
    config?: Config;
  }): Promise<T> {
    const url = `${this.baseUrl}/${this.model}/${id}/`;
    const res = await axios.put(url, body, config);
    devLog('PUT', url, res.data);
    return res.data;
  }
}
