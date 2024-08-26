import { FC, memo } from 'react';

import { PaginationProps } from './types';

import css from './index.module.css';

const Pagination: FC<PaginationProps> = ({
  pagination,
  currentItems,
  setPage
}) => {
  return (
    <div className={css.wrapper} data-testid="table-pagination">
      <p className="text-neutral-400" data-testid="table-pagination-message">
        Showing {currentItems} of {pagination.totalItems} results.
      </p>

      <div className="flex">
        <div
          data-testid="table-pagination-first-page-button"
          className={`${css.cell} ${css.left} ${
            pagination.currentPage !== 1 ? css.button : ''
          }`}
          onClick={() => {
            if (pagination.currentPage === 1) return;
            setPage(1);
          }}
        >
          &lt;&lt;
        </div>

        <div
          data-testid="table-pagination-prev-page-button"
          className={`${css.cell} ${
            pagination.currentPage !== 1 ? css.button : ''
          }`}
          onClick={() => {
            if (pagination.currentPage === 1) return;
            setPage(prev => prev - 1);
          }}
        >
          &lt;
        </div>

        <div
          className={css.cell}
          data-testid="table-pagination-current-page-text"
        >
          {pagination.currentPage}
        </div>

        <div
          data-testid="table-pagination-next-page-button"
          className={`${css.cell} ${
            pagination.currentPage !== pagination.totalPages ? css.button : ''
          }`}
          onClick={() => {
            if (pagination.currentPage === pagination.totalPages) return;
            setPage(prev => prev + 1);
          }}
        >
          &gt;
        </div>

        <div
          data-testid="table-pagination-last-page-button"
          className={`${css.cell} ${css.right} ${
            pagination.currentPage !== pagination.totalPages ? css.button : ''
          }`}
          onClick={() => {
            if (pagination.currentPage === pagination.totalPages) return;
            setPage(pagination.totalPages);
          }}
        >
          &gt;&gt;
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination) as typeof Pagination;
