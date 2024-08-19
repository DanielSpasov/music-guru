import { render, screen, within } from '@testing-library/react';

import { BaseModel } from '../../../../../Types';
import { Col } from '../../types';
import Cell from '.';
import moment from 'moment';

type TestModel = BaseModel & {
  testBool: boolean;
  testDate: string;
};

describe('Table Cell', () => {
  const rowIndex = 1;
  const index = 1;
  const item: TestModel = {
    name: 'Test123',
    uid: '1234-1234-1234-1234',
    testBool: false,
    testDate: moment().toISOString()
  };

  test('renders string cell without crashing', () => {
    const stringCell: Col<TestModel> = {
      key: 'name',
      label: 'Name',
      type: 'string'
    };

    render(
      <table>
        <tbody>
          <tr>
            <Cell
              col={stringCell}
              rowIndex={rowIndex}
              index={index}
              loading={false}
              item={item}
              actions={[]}
            />
          </tr>
        </tbody>
      </table>
    );

    const cellEl = screen.getByTestId(`row-${rowIndex}-cell-${index}`);
    expect(cellEl).toBeInTheDocument();
    expect(cellEl.textContent).toEqual(item[stringCell.key]);

    const boolTrueCell = within(cellEl).queryByTestId('boolean-true-cell');
    expect(boolTrueCell).not.toBeInTheDocument();
    const boolFalseCell = within(cellEl).queryByTestId('boolean-false-cell');
    expect(boolFalseCell).not.toBeInTheDocument();
    const actionsCell = within(cellEl).queryByTestId('actions-cell');
    expect(actionsCell).not.toBeInTheDocument();
  });

  test('renders date cell without crashing', () => {
    const dateCell: Col<TestModel> = {
      key: 'testDate',
      label: 'Date',
      type: 'date'
    };

    render(
      <table>
        <tbody>
          <tr>
            <Cell
              col={dateCell}
              rowIndex={rowIndex}
              index={index}
              loading={false}
              item={item}
              actions={[]}
            />
          </tr>
        </tbody>
      </table>
    );

    const cellEl = screen.getByTestId(`row-${rowIndex}-cell-${index}`);
    expect(cellEl).toBeInTheDocument();
    expect(cellEl.textContent).toEqual(
      moment(item[dateCell.key]?.toString()).format('ddd MMM DD YYYY')
    );

    const boolTrueCell = within(cellEl).queryByTestId('boolean-true-cell');
    expect(boolTrueCell).not.toBeInTheDocument();
    const boolFalseCell = within(cellEl).queryByTestId('boolean-false-cell');
    expect(boolFalseCell).not.toBeInTheDocument();
    const actionsCell = within(cellEl).queryByTestId('actions-cell');
    expect(actionsCell).not.toBeInTheDocument();
  });

  test('renders positive bool cell without crashing', () => {
    const booleanCell: Col<TestModel> = {
      key: 'testBool',
      label: 'Boolean',
      type: 'boolean'
    };

    render(
      <table>
        <tbody>
          <tr>
            <Cell
              col={booleanCell}
              rowIndex={rowIndex}
              index={index}
              loading={false}
              item={{ ...item, testBool: true }}
              actions={[]}
            />
          </tr>
        </tbody>
      </table>
    );

    const cellEl = screen.getByTestId(`row-${rowIndex}-cell-${index}`);
    expect(cellEl).toBeInTheDocument();

    const boolTrueCell = within(cellEl).queryByTestId('boolean-true-cell');
    expect(boolTrueCell).toBeInTheDocument();

    const boolFalseCell = within(cellEl).queryByTestId('boolean-false-cell');
    expect(boolFalseCell).not.toBeInTheDocument();
    const actionsCell = within(cellEl).queryByTestId('actions-cell');
    expect(actionsCell).not.toBeInTheDocument();
  });

  test('renders negative bool cell without crashing', () => {
    const booleanCell: Col<TestModel> = {
      key: 'testBool',
      label: 'Boolean',
      type: 'boolean'
    };

    render(
      <table>
        <tbody>
          <tr>
            <Cell
              col={booleanCell}
              rowIndex={rowIndex}
              index={index}
              loading={false}
              item={item}
              actions={[]}
            />
          </tr>
        </tbody>
      </table>
    );

    const cellEl = screen.getByTestId(`row-${rowIndex}-cell-${index}`);
    expect(cellEl).toBeInTheDocument();

    const boolFalseCell = within(cellEl).queryByTestId('boolean-false-cell');
    expect(boolFalseCell).toBeInTheDocument();

    const boolTrueCell = within(cellEl).queryByTestId('boolean-true-cell');
    expect(boolTrueCell).not.toBeInTheDocument();
    const actionsCell = within(cellEl).queryByTestId('actions-cell');
    expect(actionsCell).not.toBeInTheDocument();
  });

  test('renders actions cell without crashing', () => {
    const actions = [
      { Icon: () => <div />, onClick: vi.fn() },
      { Icon: () => <div />, onClick: vi.fn() }
    ];

    render(
      <table>
        <tbody>
          <tr>
            <Cell
              col={{ key: 'actions', type: 'actions' }}
              rowIndex={rowIndex}
              index={index}
              loading={false}
              item={item}
              actions={actions}
            />
          </tr>
        </tbody>
      </table>
    );

    const cellEl = screen.getByTestId(`row-${rowIndex}-cell-${index}`);
    expect(cellEl).toBeInTheDocument();

    const boolFalseCell = within(cellEl).queryByTestId('boolean-false-cell');
    expect(boolFalseCell).not.toBeInTheDocument();
    const boolTrueCell = within(cellEl).queryByTestId('boolean-true-cell');
    expect(boolTrueCell).not.toBeInTheDocument();

    const actionsCell = within(cellEl).queryByTestId('actions-cell');
    expect(actionsCell).toBeInTheDocument();
    expect(actionsCell?.children.length).toEqual(actions.length);
  });
});
