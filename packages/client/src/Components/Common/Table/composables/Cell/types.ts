import { ActionsCol, Col, TableProps } from '../../types';

export type CellProps<T> = {
  col: Col<T> | ActionsCol;
  item: T;
  loading: boolean;
  rowIndex: number;
  index: number;
} & Pick<TableProps<T>, 'actions'>;
