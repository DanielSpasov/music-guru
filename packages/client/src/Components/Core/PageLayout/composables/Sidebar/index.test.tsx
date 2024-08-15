import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LinkGroup } from '../../types';
import Sidebar from '.';

describe('Sidebar', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).toBeInTheDocument();
    expect(sidebarEl).toHaveClass('mt-16');

    const resourcesEl = screen.getByTestId('resources');
    expect(resourcesEl).toBeInTheDocument();

    const linksEl = screen.queryByTestId('links-0');
    expect(linksEl).not.toBeInTheDocument();
  });

  test('renders with additional props', () => {
    const links: LinkGroup[] = [
      {
        links: [],
        separate: true,
        title: 'Test'
      }
    ];

    render(
      <MemoryRouter>
        <Sidebar hideNavbar hideResourses links={links} />
      </MemoryRouter>
    );

    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).toBeInTheDocument();
    expect(sidebarEl).not.toHaveClass('mt-16');

    const resourcesEl = screen.queryByTestId('resources');
    expect(resourcesEl).not.toBeInTheDocument();

    const linksEl = screen.queryByTestId('links-0');
    expect(linksEl).toBeInTheDocument();
  });
});
