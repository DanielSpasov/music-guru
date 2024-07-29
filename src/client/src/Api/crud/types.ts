import { AxiosRequestConfig } from 'axios';

import { Body } from '../types';

export type GetProps = {
  id: string;
  config?: AxiosRequestConfig;
};

export type FetchProps = {
  config?: AxiosRequestConfig;
};

export type PostProps = {
  body: Body;
  config?: AxiosRequestConfig;
};

export type PatchProps = {
  id: string;
  body: Body;
  config?: AxiosRequestConfig;
};

export type DelProps = {
  id: string;
  config?: AxiosRequestConfig;
};

export type PutProps = {
  id: string;
  body: Body;
  config?: AxiosRequestConfig;
};
