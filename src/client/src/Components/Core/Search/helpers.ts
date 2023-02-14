import Api from '../../../Api';

export type InputProps = {
  onChange: Function;
  open: boolean;
  value: string;
  placeholder?: string;
  [css: string]: any;
};

type Models = Exclude<keyof typeof Api, 'prototype'>;

export type SearchBoxProps = {
  models: Models[];
};

export type ResultProps<T> = {
  data: T;
  toggleOpen: Function;
  model: Exclude<keyof typeof Api, 'prototype'>;
};

export type Results = [Models, any[]][];
