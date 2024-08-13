import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LinkGroup } from '../../types';
import Sidebar from '.';
import { RecentItem } from './types';

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

    const recentEl = screen.getByTestId('recently-viewed');
    expect(recentEl).toBeInTheDocument();

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
        <Sidebar hideNavbar hideRecent hideResourses links={links} />
      </MemoryRouter>
    );

    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).toBeInTheDocument();
    expect(sidebarEl).not.toHaveClass('mt-16');

    const resourcesEl = screen.queryByTestId('resources');
    expect(resourcesEl).not.toBeInTheDocument();

    const recentEl = screen.queryByTestId('recently-viewed');
    expect(recentEl).not.toBeInTheDocument();

    const linksEl = screen.queryByTestId('links-0');
    expect(linksEl).toBeInTheDocument();
  });

  test('renders recently viewed items', () => {
    const recent: RecentItem[] = [{ name: 'Test', to: '/test' }];

    localStorage.setItem('recently_viewed', JSON.stringify(recent));

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).toBeInTheDocument();

    const recentEl = screen.getByTestId('recently-viewed');
    expect(recentEl.children.length).toEqual(recent.length + 1); // + 1 Because of the title
  });
});
