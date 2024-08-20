import { AxiosRequestConfig } from 'axios';
import { ElementType } from 'react';

type ColType = 'string' | 'boolean' | 'date' | 'actions';

export type ActionsCol = {
  key: 'actions';
  type: Extract<ColType, 'actions'>;
};

export type Col<T> = {
  key: keyof T;
  label: string;
  type?: Exclude<ColType, 'actions'>;
};

export type TableRowAction<T> = {
  onClick: (uid: string) => Promise<void> | void;
  Icon: ElementType;
  label?: string;
  disableFn?: (item: T) => Promise<boolean> | boolean;
};

export type TableBulkAction = {
  onClick: (selectedUids: string[]) => Promise<void> | void;
  Icon: ElementType;
  label?: string;
  disableFn?: (uids: string[]) => Promise<boolean> | boolean;
};

export type TableProps<T> = {
  cols: Col<T>[];
  fetchFn: (config?: AxiosRequestConfig) => Promise<{ data: T[] }>;
  // Actions
  actions?: TableRowAction<T>[];
  bulkActions?: TableBulkAction[];
  // Sorting
  allowSorting?: Extract<Col<T>['key'], keyof T>[];
  // Search
  searchPlaceholder?: string;
  searchKey?: string;
  hideSearch?: boolean;
};
