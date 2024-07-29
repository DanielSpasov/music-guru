/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';

import Api from '.';

export type Body = any;

export type PostProps = {
  url: string;
  body: Body;
  config?: AxiosRequestConfig;
};

export type GetProps = {
  url: string;
  config?: AxiosRequestConfig;
};

export type PatchProps = {
  url: string;
  body: Body;
  config?: AxiosRequestConfig;
};

export type PutProps = {
  url: string;
  body: Body;
  config?: AxiosRequestConfig;
};

export type DelProps = {
  url: string;
  config?: AxiosRequestConfig;
};

export type Model = Exclude<keyof typeof Api, 'prototype'>;
