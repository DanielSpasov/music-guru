import {
  Dispatch,
  RefObject,
  SelectHTMLAttributes,
  SetStateAction
} from 'react';

export type SelectProps = {
  label: string;
  name: string;
  fetchFn: ({ config }: any) => Promise<{ data: any[] }>;
  hideSearch?: boolean;
  multiple?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

type InheritedProps = Pick<SelectProps, 'fetchFn' | 'hideSearch'>;

export type DropdownProps = InheritedProps & {
  onOptionClick: (option: any) => void;
  searchRef: RefObject<HTMLInputElement>;
  selected: any[];
  open: boolean;
};

type SelectType = 'single' | 'multi';

type SingleSelectDefaultValue = { defaultValue: Option };
type MultiSelectDefaultValue = { defaultValue: Option[] };

export type SelectComponentProps<T extends SelectType> = InheritedProps & {
  onChange: (value: any) => Promise<void>;
} & Pick<SelectProps, 'placeholder'> &
  (T extends 'single' ? SingleSelectDefaultValue : MultiSelectDefaultValue);

export type SearchProps = {
  setSearch: Dispatch<SetStateAction<string>>;
} & Pick<DropdownProps, 'searchRef'>;

export type Option = {
  uid: string;
  [key: string]: any;
};

const lightProps =
  'border-b-neutral-300 hover:border-b-neutral-400 focus:border-b-primary';
const darkProps =
  'dark:border-b-neutral-600 dark:hover:border-b-neutral-500 dark:focus:border-b-primary-dark';
export const themeProps = `border-b-2 cursor-pointer ${lightProps} ${darkProps}`;
