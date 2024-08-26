import { Dispatch, SetStateAction } from 'react';

import { Pagination } from '../../../../../Api/crud/types';

export type PaginationProps = {
  pagination: Pagination;
  currentItems: number;
  setPage: Dispatch<SetStateAction<number>>;
};
