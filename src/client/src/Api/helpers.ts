import Api from '.';

export function applyPrefix(api: any, props: any): void {
  if (props?.prefix) {
    api.model = `${props.prefix}/${api.model}`;
  }
}

export type PostProps = {
  url: string;
  body: any;
  config?: Config;
};

export type GetProps = {
  url: string;
  config?: Config;
};

export type PatchProps = {
  url: string;
  body: any;
  config?: Config;
};

export type PutProps = {
  url: string;
  body: any;
  config?: Config;
};

export type DeleteProps = {
  url: string;
  config?: Config;
};

type Serializer = 'list' | 'detailed';
export type Params = {
  serializer?: Serializer;
  [key: string]: any;
};
export type Config = {
  params?: Params;
};

export type ModelKeys = Exclude<keyof typeof Api, 'prototype'>;
