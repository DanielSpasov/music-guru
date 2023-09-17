import { ModelKeys } from '../../../Api/helpers';

export type InputProps = {
  onChange: (props: any) => any;
  open: boolean;
  value: string;
  placeholder?: string;
  [css: string]: any;
};

export type SearchBoxProps = {
  models: ModelKeys[];
  width?: string;
};

export type ResultProps<T> = {
  data: T;
  onClick: (props: any) => any;
  selected?: boolean;
};

export type Results = [ModelKeys, any[]][];
