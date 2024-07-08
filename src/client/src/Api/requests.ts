import axios from 'axios';

import { DelProps, GetProps, PatchProps, PostProps, PutProps } from './types';
import {
  delValues,
  getValues,
  patchValues,
  postValues,
  putValues
} from './defaultValues';

export const post = async ({ url, body, config }: PostProps = postValues) => {
  const response = await axios.post(url, body, {
    ...config,
    headers: {
      Authorization: localStorage.getItem('AUTH'),
      ...(config?.headers || {})
    }
  });
  return response.data;
};

export const get = async ({ url, config }: GetProps = getValues) => {
  const response = await axios.get(url, {
    headers: { Authorization: localStorage.getItem('AUTH') },
    ...config
  });
  return response.data;
};

export const patch = async ({
  url,
  body,
  config
}: PatchProps = patchValues) => {
  const response = await axios.patch(url, body, {
    headers: { Authorization: localStorage.getItem('AUTH') },
    ...config
  });
  return response.data;
};

export const put = async ({ url, body, config }: PutProps = putValues) => {
  const response = await axios.put(url, body, {
    headers: { Authorization: localStorage.getItem('AUTH') },
    ...config
  });
  return response.data;
};

export const del = async ({ url, config }: DelProps = delValues) => {
  const response = await axios.delete(url, {
    headers: { Authorization: localStorage.getItem('AUTH') },
    ...config
  });
  return response.data;
};
