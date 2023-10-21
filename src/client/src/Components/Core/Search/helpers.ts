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
};

export type Results = [ModelKeys, any[]][];
