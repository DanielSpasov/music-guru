import { TableProps } from '../../types';

export type RowProps<T> = {
  item: T;
  index: number;
} & Pick<TableProps<T>, 'cols' | 'actions'>;