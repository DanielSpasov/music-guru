import Api from '.';

export function applyPrefix(api: any, props: any): void {
  if (props?.prefix) {
    api.model = `${props.prefix}/${api.model}`;
  }
}

export type PostProps = {
  url: string;
  body: any;
  config?: any;
};

export type GetProps = {
  url: string;
  config?: any;
};

export type PatchProps = {
  url: string;
  body: any;
  config?: any;
};

export type PutProps = {
  url: string;
  body: any;
  config?: any;
};

export type DeleteProps = {
  url: string;
  config?: any;
};

export type ModelKeys = Exclude<keyof typeof Api, 'prototype'>;
