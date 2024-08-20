import { TableBulkAction, TableRowAction } from '../../types';

export type ActionType = 'row' | 'bulk';

export type RowAction<T> = {
  type: Extract<ActionType, 'row'>;
  item: T;
} & TableRowAction<T>;

export type BulkAction = {
  type: Extract<ActionType, 'bulk'>;
  onClick: () => Promise<void> | void;
  disabled?: boolean;
} & Omit<TableBulkAction, 'disableFn' | 'onClick'>;

export type ActionProps<T> = RowAction<T> | BulkAction;
