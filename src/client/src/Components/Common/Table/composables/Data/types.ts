import { ActionsCol, Col, TableProps } from '../../types';

export type DataProps<T> = {
  col: Col<T> | ActionsCol;
  item: T;
  loading: boolean;
} & Pick<TableProps<T>, 'actions'>;
