import { AxiosRequestConfig } from 'axios';
import { ElementType } from 'react';

type ColType = 'string' | 'boolean' | 'date' | 'actions';

export type SortingDir = 'asc' | 'desc' | null;

export type Sorting<T> = {
  key: keyof T | null;
  direction: SortingDir;
};

export type ActionsCol = {
  key: 'actions';
  type: Extract<ColType, 'actions'>;
};

export type DataCol<T> = {
  key: keyof T;
  label: string;
  type?: Exclude<ColType, 'actions'>;
};

export type Col<T> = DataCol<T>;

export type TableAction<T> = {
  onClick: (uid: string) => Promise<void> | void;
  Icon: ElementType;
  label?: string;
  disableFn?: (item: T) => Promise<boolean> | boolean;
};

export type TableProps<T> = {
  cols: Col<T>[];
  fetchFn: (config?: AxiosRequestConfig) => Promise<{ data: T[] }>;
  actions?: TableAction<T>[];
  hideSearch?: boolean;
  searchKey?: string;
};
