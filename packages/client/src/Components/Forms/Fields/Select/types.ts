import { SelectHTMLAttributes } from 'react';
import { AxiosRequestConfig } from 'axios';

type FetchFn<T> = ({
  config
}: {
  config: AxiosRequestConfig;
}) => Promise<{ data: T[] }>;

export type SelectProps<T extends Option> = {
  label: string;
  name: string;
  fetchFn: FetchFn<T>;
  hideSearch?: boolean;
  multiple?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export type ResultsProps<T extends Option> = Pick<SelectProps<T>, 'fetchFn'> & {
  onOptionClick: (option: Option) => void;
  selected: Option[];
  search: string;
};

type SelectType = 'single' | 'multi';

type SingleSelectDefaultValue = {
  defaultValue: Option | null;
  onChange: (value: Option | null) => Promise<void>;
};
type MultiSelectDefaultValue = {
  defaultValue: Option[];
  onChange: (value: Option[]) => Promise<void>;
};

export type SelectComponentProps<T extends SelectType, K extends Option> = Pick<
  SelectProps<K>,
  'placeholder' | 'fetchFn' | 'hideSearch'
> &
  (T extends 'single' ? SingleSelectDefaultValue : MultiSelectDefaultValue);

export type Option = {
  uid: string;
  name: string;
  image?: string;
};
