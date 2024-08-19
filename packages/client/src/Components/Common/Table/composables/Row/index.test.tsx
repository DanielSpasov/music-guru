import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { BaseModel } from '../../../../../Types';
import { RowProps } from './types';
import Row from '.';

describe('Table Row', () => {
  const index = 1;
  const item = {
    uid: '1234-1234-1234-1234',
    name: 'Test123'
  };
  const cols: RowProps<BaseModel>['cols'] = [
    {
      key: 'uid',
      label: 'UID',
      type: 'string'
    },
    {
      key: 'name',
      label: 'Name',
      type: 'string'
    }
  ];

  test('renders without crashing', () => {
    render(
      <table>
        <tbody>
          <Row
            cols={cols}
            index={index}
            isSelected={false}
            item={item}
            setSelected={vi.fn()}
          />
        </tbody>
      </table>
    );

    const rowEl = screen.getByTestId(`row-${index}`);
    expect(rowEl).toBeInTheDocument();

    const checkboxEl = screen.queryByTestId(`row-${index}-checkbox`);
    expect(checkboxEl).not.toBeInTheDocument();

    const checkboxCheckEl = screen.queryByTestId(`row-${index}-checkbox-check`);
    expect(checkboxCheckEl).not.toBeInTheDocument();

    const loaderEl = screen.queryByTestId(`row-${index}-loader`);
    expect(loaderEl).not.toBeInTheDocument();
  });

  test('calls setSelected with correct props when checkbox is not selected and clicked', () => {
    const setSelected = vi.fn();
    render(
      <table>
        <tbody>
          <Row
            cols={cols}
            index={index}
            isSelected={false}
            item={item}
            setSelected={setSelected}
            bulkActions={[{ Icon: () => <div />, onClick: vi.fn() }]}
          />
        </tbody>
      </table>
    );

    const rowEl = screen.getByTestId(`row-${index}`);
    expect(rowEl).toBeInTheDocument();

    const checkboxEl = screen.getByTestId(`row-${index}-checkbox`);
    expect(checkboxEl).toBeInTheDocument();

    const checkboxCheckEl = screen.queryByTestId(`row-${index}-checkbox-check`);
    expect(checkboxCheckEl).not.toBeInTheDocument();

    fireEvent.click(checkboxEl);

    expect(setSelected).toHaveBeenCalledWith(expect.any(Function));
    expect(setSelected.mock.calls[0][0]([])).toEqual([item.uid]);
  });

  test('calls setSelected with correct props when checkbox is selected and clicked', () => {
    const setSelected = vi.fn();
    render(
      <table>
        <tbody>
          <Row
            cols={cols}
            index={index}
            isSelected
            item={item}
            setSelected={setSelected}
            bulkActions={[{ Icon: () => <div />, onClick: vi.fn() }]}
          />
        </tbody>
      </table>
    );

    const rowEl = screen.getByTestId(`row-${index}`);
    expect(rowEl).toBeInTheDocument();

    const checkboxEl = screen.getByTestId(`row-${index}-checkbox`);
    expect(checkboxEl).toBeInTheDocument();

    const checkboxCheckEl = screen.getByTestId(`row-${index}-checkbox-check`);
    expect(checkboxCheckEl).toBeInTheDocument();

    fireEvent.click(checkboxEl);

    expect(setSelected).toHaveBeenCalledWith(expect.any(Function));
    expect(setSelected.mock.calls[0][0]([])).toEqual([]);
  });

  test('shows loader when an async action is clicked', async () => {
    const onClick = vi.fn();
    render(
      <table>
        <tbody>
          <Row
            cols={cols}
            item={item}
            isSelected={false}
            index={index}
            setSelected={vi.fn()}
            actions={[{ Icon: () => <div />, onClick }]}
          />
        </tbody>
      </table>
    );

    const rowEl = screen.getByTestId(`row-${index}`);
    expect(rowEl).toBeInTheDocument();

    const actionEl = screen.getByTestId(`table-row-action`);
    expect(actionEl).toBeInTheDocument();

    const loaderEl = screen.queryByTestId(`row-${index}-loader`);
    expect(loaderEl).not.toBeInTheDocument();

    fireEvent.click(actionEl);

    expect(onClick).toHaveBeenCalled();

    await waitFor(() => {
      const loaderEl = screen.getByTestId(`row-${index}-loader`);
      expect(loaderEl).toBeInTheDocument();
    });
  });

  test("doesn't call row action onClick if the item is bulk action selected (isSelected)", async () => {
    const onClick = vi.fn();
    render(
      <table>
        <tbody>
          <Row
            cols={cols}
            item={item}
            isSelected
            index={index}
            setSelected={vi.fn()}
            actions={[{ Icon: () => <div />, onClick }]}
          />
        </tbody>
      </table>
    );

    const rowEl = screen.getByTestId(`row-${index}`);
    expect(rowEl).toBeInTheDocument();

    const actionEl = screen.getByTestId(`table-row-action`);
    expect(actionEl).toBeInTheDocument();

    const loaderEl = screen.queryByTestId(`row-${index}-loader`);
    expect(loaderEl).not.toBeInTheDocument();

    fireEvent.click(actionEl);

    expect(onClick).not.toHaveBeenCalled();
  });
});
