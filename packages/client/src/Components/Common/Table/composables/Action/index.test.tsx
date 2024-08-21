import { fireEvent, render, screen } from '@testing-library/react';

import { BaseModel } from '../../../../../Types';
import Action from '.';

const MockIcon = () => <div data-testid="table-mock-icon" />;

describe('Table Bulk Action', () => {
  test('renders without crashing', () => {
    const onClick = vi.fn();
    render(<Action type="bulk" Icon={MockIcon} onClick={onClick} />);

    const rowActionEl = screen.queryByTestId('table-row-action');
    expect(rowActionEl).not.toBeInTheDocument();

    const bulkActionEl = screen.getByTestId('table-bulk-action');
    expect(bulkActionEl).toBeInTheDocument();
    expect(bulkActionEl.textContent).toEqual('');
    expect(bulkActionEl).not.toBeDisabled();

    fireEvent.click(bulkActionEl);
    expect(onClick).toBeCalled();

    const iconEl = screen.getByTestId('table-mock-icon');
    expect(iconEl).toBeInTheDocument();
  });

  test('renders with additional props', () => {
    const onClick = vi.fn();
    render(
      <Action
        type="bulk"
        Icon={MockIcon}
        onClick={onClick}
        disabled
        label="test123"
      />
    );

    const rowActionEl = screen.queryByTestId('table-row-action');
    expect(rowActionEl).not.toBeInTheDocument();

    const bulkActionEl = screen.getByTestId('table-bulk-action');
    expect(bulkActionEl).toBeInTheDocument();
    expect(bulkActionEl.textContent).toEqual('test123');
    expect(bulkActionEl).toBeDisabled();

    fireEvent.click(bulkActionEl);
    expect(onClick).not.toBeCalled();

    const iconEl = screen.getByTestId('table-mock-icon');
    expect(iconEl).toBeInTheDocument();
  });
});

describe('Table Row Action', () => {
  const item: BaseModel = {
    name: 'TestName',
    uid: '1234-1234-1234-1234'
  };

  test('renders without crashing', () => {
    const onClick = vi.fn();
    render(<Action type="row" Icon={MockIcon} onClick={onClick} item={item} />);

    const bulkActionEl = screen.queryByTestId('table-bulk-action');
    expect(bulkActionEl).not.toBeInTheDocument();

    const rowActionEl = screen.getByTestId('table-row-action');
    expect(rowActionEl).toBeInTheDocument();
    expect(rowActionEl.textContent).toEqual('');
    expect(rowActionEl).not.toBeDisabled();

    fireEvent.click(rowActionEl);
    expect(onClick).toBeCalledWith(item.uid);

    const iconEl = screen.getByTestId('table-mock-icon');
    expect(iconEl).toBeInTheDocument();
  });

  test('renders with additional props', () => {
    const onClick = vi.fn();
    const disableFn = vi.fn().mockReturnValue(true);
    render(
      <Action
        type="row"
        Icon={MockIcon}
        onClick={onClick}
        disableFn={disableFn}
        label="Test"
        item={item}
      />
    );

    const bulkActionEl = screen.queryByTestId('table-bulk-action');
    expect(bulkActionEl).not.toBeInTheDocument();

    const rowActionEl = screen.getByTestId('table-row-action');
    expect(rowActionEl).toBeInTheDocument();
    expect(rowActionEl.textContent).toEqual('Test');
    expect(rowActionEl).toBeDisabled();

    expect(disableFn).toBeCalledWith(item);

    fireEvent.click(rowActionEl);
    expect(onClick).not.toBeCalled();

    const iconEl = screen.getByTestId('table-mock-icon');
    expect(iconEl).toBeInTheDocument();
  });
});
