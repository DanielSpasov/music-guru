import { act, fireEvent, render, screen } from '@testing-library/react';

import { Sorting as ISorting } from '../../types';
import Sorting from '.';

describe('Sorting', () => {
  const config: ISorting[] = [
    {
      key: 'created_at',
      label: 'Latest'
    },
    {
      key: 'release_date',
      label: 'Release Date'
    }
  ];

  test('renders without crashing', async () => {
    await act(async () => {
      render(<Sorting config={config} setValue={vi.fn()} />);
    });

    const sortingEl = screen.getByTestId('list-sorting');
    expect(sortingEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId('sort-menu-button');
    expect(buttonEl).toBeInTheDocument();

    const labelEl = screen.getByTestId('sort-menu-active-label');
    expect(labelEl.textContent).toEqual(config[0].label);

    const ascEl = screen.getByTestId('sort-menu-active-asc');
    expect(ascEl).toBeInTheDocument();
    const descEl = screen.queryByTestId('sort-menu-active-desc');
    expect(descEl).not.toBeInTheDocument();

    const contentEl = screen.queryByTestId('sort-menu-content');
    expect(contentEl).not.toBeInTheDocument();
  });

  test('renders content when the button is clicked', async () => {
    await act(async () => {
      render(<Sorting config={config} setValue={vi.fn()} />);
    });

    const sortingEl = screen.getByTestId('list-sorting');
    expect(sortingEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId('sort-menu-button');
    expect(buttonEl).toBeInTheDocument();
    fireEvent.click(buttonEl);

    const contentEl = screen.queryByTestId('sort-menu-content');
    expect(contentEl).toBeInTheDocument();
    expect(contentEl?.children.length).toEqual(config.length);
  });

  test('renders correct option', async () => {
    await act(async () => {
      render(<Sorting config={config} setValue={vi.fn()} />);
    });

    const sortingEl = screen.getByTestId('list-sorting');
    expect(sortingEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId('sort-menu-button');
    expect(buttonEl).toBeInTheDocument();
    fireEvent.click(buttonEl);

    const contentEl = screen.getByTestId('sort-menu-content');
    expect(contentEl).toBeInTheDocument();

    const activeOptionEl = screen.getByTestId(`sort-option-${config[0].key}`);
    expect(activeOptionEl).toBeInTheDocument();

    const activeOptionLabelEl = screen.getByTestId(
      `sort-option-${config[0].key}-label`
    );
    expect(activeOptionLabelEl).toBeInTheDocument();
    expect(activeOptionLabelEl.textContent).toEqual(config[0].label);
  });

  test('changes label if an option is clicked', async () => {
    await act(async () => {
      render(<Sorting config={config} setValue={vi.fn()} />);
    });

    const sortingEl = screen.getByTestId('list-sorting');
    expect(sortingEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId('sort-menu-button');
    expect(buttonEl).toBeInTheDocument();
    fireEvent.click(buttonEl);

    const contentEl = screen.getByTestId('sort-menu-content');
    expect(contentEl).toBeInTheDocument();

    // Default label
    const activeLabelEl = screen.getByTestId('sort-menu-active-label');
    expect(activeLabelEl.textContent).toEqual(config[0].label);

    // Default icon
    const activeAscEl = screen.queryByTestId('sort-menu-active-asc');
    expect(activeAscEl).toBeInTheDocument();
    const activeDescEl = screen.queryByTestId('sort-menu-active-desc');
    expect(activeDescEl).not.toBeInTheDocument();

    // Click descending option
    const optionDescEl = screen.getByTestId(
      `sort-option-${config[1].key}-desc-icon`
    );
    expect(optionDescEl).toBeInTheDocument();
    fireEvent.click(optionDescEl);

    // Updated label
    expect(activeLabelEl.textContent).toEqual(config[1].label);

    // Updated icon
    const newActiveAscEl = screen.queryByTestId('sort-menu-active-asc');
    expect(newActiveAscEl).not.toBeInTheDocument();
    const newActiveDescEl = screen.queryByTestId('sort-menu-active-desc');
    expect(newActiveDescEl).toBeInTheDocument();
  });

  test('calls setValue with correct key based on ascending or descending', async () => {
    const setValue = vi.fn();
    await act(async () => {
      render(<Sorting config={config} setValue={setValue} />);
    });

    const sortingEl = screen.getByTestId('list-sorting');
    expect(sortingEl).toBeInTheDocument();

    const buttonEl = screen.getByTestId('sort-menu-button');
    expect(buttonEl).toBeInTheDocument();
    fireEvent.click(buttonEl);

    const contentEl = screen.getByTestId('sort-menu-content');
    expect(contentEl).toBeInTheDocument();

    // Click descending option
    const optionDescEl = screen.getByTestId(
      `sort-option-${config[1].key}-desc-icon`
    );
    expect(optionDescEl).toBeInTheDocument();
    fireEvent.click(optionDescEl);

    expect(setValue).toBeCalledWith(`-${config[1].key}`);

    // Click new option
    const optionAscEl = screen.getByTestId(
      `sort-option-${config[1].key}-asc-icon`
    );
    expect(optionAscEl).toBeInTheDocument();
    fireEvent.click(optionAscEl);

    expect(setValue).toBeCalledWith(config[1].key);
  });
});
