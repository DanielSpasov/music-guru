import { AxiosRequestConfig } from 'axios';
import {
  Dispatch,
  RefObject,
  SelectHTMLAttributes,
  SetStateAction
} from 'react';

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

export type InheritedProps<T extends Option> = Pick<
  SelectProps<T>,
  'fetchFn' | 'hideSearch'
>;

export type DropdownProps<T extends Option> = InheritedProps<T> & {
  onOptionClick: (option: Option) => void;
  searchRef: RefObject<HTMLInputElement>;
  selected: Option[];
  open: boolean;
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

export type SelectComponentProps<
  T extends SelectType,
  K extends Option
> = InheritedProps<K> &
  Pick<SelectProps<K>, 'placeholder'> &
  (T extends 'single' ? SingleSelectDefaultValue : MultiSelectDefaultValue);

export type SearchProps<T extends Option> = {
  setSearch: Dispatch<SetStateAction<string>>;
} & Pick<DropdownProps<T>, 'searchRef'>;

export type Option = {
  uid: string;
  name: string;
};
