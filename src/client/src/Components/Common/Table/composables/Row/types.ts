import { TableProps } from '../../types';

export type RowProps<T> = {
  item: T;
  index: number;
  loading?: boolean;
} & Pick<TableProps<T>, 'cols' | 'actions'>;
