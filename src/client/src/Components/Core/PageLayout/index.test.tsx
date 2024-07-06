import { screen, render } from '@testing-library/react';
import PageLayout from '.';
import { MemoryRouter } from 'react-router-dom';

describe('PageLayout', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <PageLayout title="Test">
          <span>test</span>
        </PageLayout>
      </MemoryRouter>
    );

    expect(document.title).toEqual('Test');

    const pageEl = screen.getByTestId('page');
    expect(pageEl).toBeInTheDocument();

    const pageBodyEl = screen.getByTestId('page-body');
    expect(pageBodyEl).toBeInTheDocument();
    expect(pageBodyEl).toHaveClass('pt-16');

    const navbarEl = screen.getByTestId('navbar');
    expect(navbarEl).toBeInTheDocument();

    const pageContentEl = screen.getByTestId('page-content');
    expect(pageContentEl).toBeInTheDocument();
    expect(pageContentEl).toHaveClass('ml-64');
    expect(pageContentEl).toContainHTML('<span>test</span>');

    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).toBeInTheDocument();

    const headerEl = screen.getByTestId('header');
    expect(headerEl).toBeInTheDocument();

    const loaderEl = screen.queryByTestId('page-loader');
    expect(loaderEl).not.toBeInTheDocument();
  });

  test('renders with additional props', () => {
    render(
      <MemoryRouter>
        <PageLayout title="Test" hideNavbar hideSidebar hideHeader loading />
      </MemoryRouter>
    );

    const pageEl = screen.getByTestId('page');
    expect(pageEl).toBeInTheDocument();

    const pageBodyEl = screen.getByTestId('page-body');
    expect(pageBodyEl).toBeInTheDocument();
    expect(pageBodyEl).not.toHaveClass('pt-16');

    const navbarEl = screen.queryByTestId('navbar');
    expect(navbarEl).not.toBeInTheDocument();

    const pageContentEl = screen.getByTestId('page-content');
    expect(pageContentEl).toBeInTheDocument();
    expect(pageContentEl).not.toHaveClass('ml-64');

    const sidebarEl = screen.queryByTestId('sidebar');
    expect(sidebarEl).not.toBeInTheDocument();

    const headerEl = screen.queryByTestId('header');
    expect(headerEl).not.toBeInTheDocument();

    const loaderEl = screen.queryByTestId('page-loader');
    expect(loaderEl).toBeInTheDocument();
  });
});
