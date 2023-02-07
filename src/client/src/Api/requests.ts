import axios from 'axios';

import {
  DeleteProps,
  GetProps,
  PatchProps,
  PostProps,
  PutProps
} from './helpers';

export async function post({
  url = '',
  body,
  config = {}
}: PostProps): Promise<any> {
  const response = await axios.post(url, body, config);
  return response.data;
}

export async function get({ url = '', config = {} }: GetProps): Promise<any> {
  const response = await axios.get(url, config);
  return response.data;
}

export async function patch({
  url = '',
  body,
  config = {}
}: PatchProps): Promise<any> {
  const response = await axios.patch(url, body, config);
  return response.data;
}

export async function put({
  url = '',
  body,
  config = {}
}: PutProps): Promise<any> {
  const response = await axios.put(url, body, config);
  return response.data;
}

export async function del({
  url = '',
  config = {}
}: DeleteProps): Promise<any> {
  const response = await axios.delete(url, config);
  return response;
}
