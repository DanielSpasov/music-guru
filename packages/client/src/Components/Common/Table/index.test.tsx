import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react';
import Table from '.';

describe('Table', () => {
  test('renders without crashing', async () => {
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={vi.fn()}
          hideSearch
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableSearchBoxEl = screen.queryByTestId('table-search-box');
    expect(tableSearchBoxEl).not.toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    const bulkActionsEl = screen.queryByTestId('table-bulk-actions');
    expect(bulkActionsEl).not.toBeInTheDocument();

    const bulkActionsHeadEl = screen.queryByTestId('table-bulk-actions-head');
    expect(bulkActionsHeadEl).not.toBeInTheDocument();

    const rowActionsHeadEl = screen.queryByTestId('table-row-actions-head');
    expect(rowActionsHeadEl).not.toBeInTheDocument();

    const loaderEl = screen.queryByTestId('table-loader');
    expect(loaderEl).not.toBeInTheDocument();
  });

  test('renders with additional props', async () => {
    const actions = [{ Icon: () => <div />, onClick: vi.fn() }];
    const bulkActions = [{ Icon: () => <div />, onClick: vi.fn() }];
    const searchPlaceholder = 'test123';
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={vi.fn()}
          actions={actions}
          bulkActions={bulkActions}
          searchPlaceholder={searchPlaceholder}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableSearchBoxEl = screen.getByTestId('table-search-box');
    expect(tableSearchBoxEl).toBeInTheDocument();
    const searchEl = within(tableSearchBoxEl).getByTestId('search-input');
    expect(searchEl).toBeInTheDocument();
    expect(searchEl).toHaveAttribute('placeholder', searchPlaceholder);

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    const bulkActionsEl = screen.getByTestId('table-bulk-actions');
    expect(bulkActionsEl).toBeInTheDocument();
    expect(bulkActionsEl.children.length).toEqual(bulkActions.length);

    const bulkActionsHeadEl = screen.queryByTestId('table-bulk-actions-head');
    expect(bulkActionsHeadEl).toBeInTheDocument();

    const rowActionsHeadEl = screen.queryByTestId('table-row-actions-head');
    expect(rowActionsHeadEl).toBeInTheDocument();

    const loaderEl = screen.queryByTestId('table-loader');
    expect(loaderEl).not.toBeInTheDocument();
  });

  test('renders loader while fetching data', async () => {
    render(
      <Table
        cols={[
          { key: 'uid', label: 'UID' },
          { key: 'name', label: 'Name' }
        ]}
        fetchFn={vi.fn()}
      />
    );

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    await waitFor(() => {
      const loaderEl = screen.queryByTestId('table-loader');
      expect(loaderEl).toBeInTheDocument();
    });
  });

  test('renders "No items message." if no data is fetched', async () => {
    const fetchFn = vi.fn().mockReturnValue({ data: [] });
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchFn}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalled();
    });

    const noItemsMessageEl = screen.getByTestId('table-no-items-message');
    expect(noItemsMessageEl).toBeInTheDocument();
  });

  test('renders data if available when fetched', async () => {
    const data = [
      { uid: '1234-1234-1234-1234', name: '1234' },
      { uid: '5678-5678-5678-5678', name: '5768' }
    ];
    const fetchFn = vi.fn().mockReturnValue({ data });
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchFn}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalled();
    });

    const noItemsMessageEl = screen.queryByTestId('table-no-items-message');
    expect(noItemsMessageEl).not.toBeInTheDocument();

    const loaderEl = screen.queryByTestId('table-loader');
    expect(loaderEl).not.toBeInTheDocument();

    const tableBodyEl = screen.getByTestId('table-body');
    expect(tableBodyEl.children.length).toEqual(data.length);
  });

  test('calls fetchFn exactly once on initial load', async () => {
    const fetchFn = vi.fn();
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchFn}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledOnce();
    });
  });

  test('calls fetchFn with correct searchKey if provided', async () => {
    const fetchFn = vi.fn();
    const value = 'testsearchvalue';
    const key = 'test123';
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchFn}
          searchKey={key}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    const tableSearchBoxEl = screen.getByTestId('table-search-box');
    expect(tableSearchBoxEl).toBeInTheDocument();
    const searchEl = within(tableSearchBoxEl).getByTestId('search-input');
    expect(searchEl).toBeInTheDocument();

    fireEvent.change(searchEl, { target: { value } });

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledWith({
        params: { sort: '-created_at', [key]: value }
      });
    });
  });

  test('calls fetchFn with default searchKey if not provided', async () => {
    const fetchFn = vi.fn();
    const value = 'testsearchvalue';
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchFn}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    const tableSearchBoxEl = screen.getByTestId('table-search-box');
    expect(tableSearchBoxEl).toBeInTheDocument();
    const searchEl = within(tableSearchBoxEl).getByTestId('search-input');
    expect(searchEl).toBeInTheDocument();

    fireEvent.change(searchEl, { target: { value } });

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledWith({
        params: { sort: '-created_at', name: value }
      });
    });
  });

  test('calls fetchFn with correct sorting key', async () => {
    const fetchFn = vi.fn();
    await act(async () => {
      render(
        <Table
          cols={[
            { key: 'uid', label: 'UID' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchFn}
          allowSorting={['name']}
        />
      );
    });

    const tableSectionEl = screen.getByTestId('table-section');
    expect(tableSectionEl).toBeInTheDocument();

    const tableEl = screen.getByTestId('table');
    expect(tableEl).toBeInTheDocument();

    const sortUid = screen.getByTestId(`table-head-0`);
    expect(sortUid).toBeInTheDocument();
    fireEvent.click(sortUid);

    const sortName = screen.getByTestId(`table-head-1`);
    expect(sortName).toBeInTheDocument();
    fireEvent.click(sortName);
    fireEvent.click(sortName);

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(3);

      const [firstCallArgs, secondCallArgs, thirdCallArgs] = fetchFn.mock.calls;
      expect(firstCallArgs[0]).toEqual({
        params: { sort: '-created_at', name: '' }
      });

      expect(secondCallArgs[0]).toEqual({
        params: { sort: 'name', name: '' }
      });

      expect(thirdCallArgs[0]).toEqual({
        params: { sort: '-name', name: '' }
      });
    });
  });
});
