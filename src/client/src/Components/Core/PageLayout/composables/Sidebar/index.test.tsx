import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from '.';

describe('Sidebar', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const element = screen.getByTestId('sidebar');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('mt-16');
  });

  test('renders without top margin if navbar is hidden', () => {
    render(
      <MemoryRouter>
        <Sidebar hideNavbar />
      </MemoryRouter>
    );

    const element = screen.getByTestId('sidebar');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('mt-16');
  });
});
