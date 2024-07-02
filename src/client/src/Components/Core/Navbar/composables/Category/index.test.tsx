import { render, screen } from '@testing-library/react';

import Category from '.';

describe('Category', () => {
  test('renders without crashing', () => {
    render(
      <Category>
        <div>test</div>
      </Category>
    );

    const categoryEl = screen.getByTestId('category');
    const separatorEl = screen.queryByTestId('category-separator');

    expect(categoryEl).toBeInTheDocument();
    expect(categoryEl).toContainHTML('<div>test</div>');

    expect(separatorEl).not.toBeInTheDocument();
  });

  test('renders separator if separate is true', () => {
    render(<Category separate />);
    const element = screen.getByTestId('category-separator');
    expect(element).toBeInTheDocument();
  });

  test('renders with extra className', () => {
    const className = 'bg-neurtal-50';
    render(<Category className={className} />);
    const element = screen.getByTestId('category');
    expect(element).toHaveClass(className);
  });
});
