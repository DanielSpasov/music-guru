import { fireEvent, render, screen } from '@testing-library/react';

import Pagination from '.';

describe('Table Pagination', () => {
  test('renders without crashing & prev buttons call setPage', () => {
    const setPage = vi.fn();
    const currentItems = 5;
    const pagination = {
      currentPage: 2,
      totalItems: 5,
      totalPages: 2
    };

    render(
      <Pagination
        currentItems={currentItems}
        pagination={pagination}
        setPage={setPage}
      />
    );

    const wrapperEl = screen.getByTestId('table-pagination');
    expect(wrapperEl).toBeInTheDocument();

    const messageEl = screen.getByTestId('table-pagination-message');
    expect(messageEl).toBeInTheDocument();
    expect(messageEl.textContent).toEqual(
      `Showing ${currentItems} of ${pagination.totalItems} results.`
    );

    const firstPageBtn = screen.getByTestId(
      'table-pagination-first-page-button'
    );

    const nextPageBtn = screen.getByTestId('table-pagination-next-page-button');
    expect(nextPageBtn).toBeInTheDocument();
    fireEvent.click(nextPageBtn);
    expect(setPage).not.toHaveBeenCalled();

    const lastPageBtn = screen.getByTestId('table-pagination-last-page-button');
    expect(lastPageBtn).toBeInTheDocument();
    fireEvent.click(lastPageBtn);
    expect(setPage).not.toHaveBeenCalled();

    const pageTextEl = screen.getByTestId('table-pagination-current-page-text');
    expect(pageTextEl).toBeInTheDocument();
    expect(pageTextEl.textContent).toEqual(pagination.currentPage.toString());

    expect(firstPageBtn).toBeInTheDocument();
    fireEvent.click(firstPageBtn);
    expect(setPage).toHaveBeenCalledTimes(1);

    const prevPageBtn = screen.getByTestId('table-pagination-prev-page-button');
    expect(prevPageBtn).toBeInTheDocument();
    fireEvent.click(prevPageBtn);
    expect(setPage).toHaveBeenCalledTimes(2);
  });

  test('renders without crashing & next buttons call setPage', () => {
    const setPage = vi.fn();
    const currentItems = 5;
    const pagination = {
      currentPage: 1,
      totalItems: 5,
      totalPages: 2
    };

    render(
      <Pagination
        currentItems={currentItems}
        pagination={pagination}
        setPage={setPage}
      />
    );

    const wrapperEl = screen.getByTestId('table-pagination');
    expect(wrapperEl).toBeInTheDocument();

    const messageEl = screen.getByTestId('table-pagination-message');
    expect(messageEl).toBeInTheDocument();
    expect(messageEl.textContent).toEqual(
      `Showing ${currentItems} of ${pagination.totalItems} results.`
    );

    const firstPageBtn = screen.getByTestId(
      'table-pagination-first-page-button'
    );
    expect(firstPageBtn).toBeInTheDocument();
    fireEvent.click(firstPageBtn);
    expect(setPage).not.toHaveBeenCalled();

    const prevPageBtn = screen.getByTestId('table-pagination-prev-page-button');
    expect(prevPageBtn).toBeInTheDocument();
    fireEvent.click(prevPageBtn);
    expect(setPage).not.toHaveBeenCalled();

    const pageTextEl = screen.getByTestId('table-pagination-current-page-text');
    expect(pageTextEl).toBeInTheDocument();
    expect(pageTextEl.textContent).toEqual(pagination.currentPage.toString());

    const nextPageBtn = screen.getByTestId('table-pagination-next-page-button');
    expect(nextPageBtn).toBeInTheDocument();
    fireEvent.click(nextPageBtn);
    expect(setPage).toHaveBeenCalledTimes(1);

    const lastPageBtn = screen.getByTestId('table-pagination-last-page-button');
    expect(lastPageBtn).toBeInTheDocument();
    fireEvent.click(lastPageBtn);
    expect(setPage).toHaveBeenCalledTimes(2);
  });
});
