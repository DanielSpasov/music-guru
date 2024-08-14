import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Filters from '.';

describe('List', () => {
  describe('Rendering', () => {
    test('renders without crashing', () => {
      render(<Filters config={[]} onApply={vi.fn()} />);
      const element = screen.getByTestId('list-filters');
      expect(element).toBeInTheDocument();
    });

    test('renders all filters from the config successfully', () => {
      const config = [
        {
          key: 'filter-1',
          label: 'Filter 1'
        },
        {
          key: 'filter-2',
          label: 'Filter 2'
        }
      ];

      render(<Filters config={config} onApply={vi.fn()} />);
      const elements = screen.queryAllByTestId('list-filter');
      expect(elements.length).toEqual(config.length);
    });
  });

  describe('Component props', () => {
    const config = [
      {
        key: 'filter1',
        label: 'Filter 1'
      }
    ];

    test('renders correct filter label', () => {
      render(<Filters config={config} onApply={vi.fn()} />);
      const element = screen.getByTestId('list-filter-label');
      expect(element.textContent).toEqual(config[0].label);
    });

    test('renders correct input name', () => {
      render(<Filters config={config} onApply={vi.fn()} />);
      const element = screen.getByTestId('list-filter-input');
      expect(element).toHaveAttribute('name', config[0].key);
    });

    test('renders correct input placeholder', () => {
      const filter = {
        key: 'test',
        label: 'Test',
        placeholder: 'Test Placeholder'
      };
      render(<Filters config={[filter]} onApply={vi.fn()} />);
      const element = screen.getByTestId('list-filter-input');
      expect(element).toHaveAttribute('placeholder', filter.placeholder);
    });

    test('renders default input placeholder if no placeholder is provided', () => {
      render(<Filters config={config} onApply={vi.fn()} />);
      const element = screen.getByTestId('list-filter-input');
      expect(element).toHaveAttribute('placeholder', 'Search...');
    });

    test('calls onApplyFilters when submit is clicked', async () => {
      const onApplyFilters = vi.fn();
      render(<Filters config={config} onApply={onApplyFilters} />);
      const element = screen.getByTestId('list-filter-submit');
      await act(async () => fireEvent.click(element));
      expect(onApplyFilters).toBeCalled();
    });

    test('calls onApplyFilters with the correct props', async () => {
      const onApplyFilters = vi.fn();
      const inputValue = 'Test input value';

      render(<Filters config={config} onApply={onApplyFilters} />);

      const inputEl = screen.getByTestId('list-filter-input');
      const submitEl = screen.getByTestId('list-filter-submit');

      await act(async () => {
        await userEvent.type(inputEl, inputValue);
        fireEvent.click(submitEl);
      });

      expect(onApplyFilters).toHaveBeenCalledWith({
        params: { [config[0].key]: inputValue }
      });
    });

    test('calls onApplyFilter when clicking Enter while focusing the input field', async () => {
      const onApplyFilters = vi.fn();
      render(<Filters config={config} onApply={onApplyFilters} />);
      const inputEl = screen.getByTestId('list-filter-input');
      await userEvent.type(inputEl, '{enter}');
      expect(onApplyFilters).toHaveBeenCalled();
    });

    test('calls onApplyFilter when clicking Enter while focusing the submit button', async () => {
      const onApplyFilters = vi.fn();
      render(<Filters config={config} onApply={onApplyFilters} />);
      const submitEl = screen.getByTestId('list-filter-submit');
      await userEvent.type(submitEl, '{enter}');
      expect(onApplyFilters).toHaveBeenCalled();
    });
  });
});
