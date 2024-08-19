import { Dispatch, SetStateAction } from 'react';
import { TableProps } from '../../types';

export type RowProps<T> = {
  item: T;
  index: number;
  isSelected: boolean;
  setSelected: Dispatch<SetStateAction<string[]>>;
} & Pick<TableProps<T>, 'cols' | 'actions' | 'bulkActions'>;
