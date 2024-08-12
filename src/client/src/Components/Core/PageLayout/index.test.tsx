import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PageLayout from '.';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({ pathname: '/test/pathname' })
  };
});

const addCurrentMock = vi.fn();

vi.mock('../../../Hooks/useRecentlyViewed', () => ({
  default: () => ({
    addCurrent: addCurrentMock,
    recentlyViewed: []
  })
}));

describe('PageLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <PageLayout title="Test" footerContent={<div>test123</div>}>
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

    const footerEl = screen.getByTestId('footer');
    expect(footerEl).toBeInTheDocument();
    expect(footerEl).toContainHTML('<div>test123</div>');

    const loaderEl = screen.queryByTestId('page-loader');
    expect(loaderEl).not.toBeInTheDocument();

    expect(addCurrentMock).toHaveBeenCalled();
  });

  test('renders with additional props', () => {
    render(
      <MemoryRouter>
        <PageLayout
          title="Test"
          hideNavbar
          hideSidebar
          hideHeader
          hideFooter
          loading
        />
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

    const footerEl = screen.queryByTestId('footer');
    expect(footerEl).not.toBeInTheDocument();

    const loaderEl = screen.queryByTestId('page-loader');
    expect(loaderEl).toBeInTheDocument();

    expect(addCurrentMock).not.toHaveBeenCalled();
  });

  test("doesn't save recent if dontSaveRecent is true", () => {
    render(
      <MemoryRouter>
        <PageLayout
          title="Test"
          hideNavbar
          hideSidebar
          hideHeader
          dontSaveRecent
        />
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
    expect(loaderEl).not.toBeInTheDocument();

    expect(addCurrentMock).not.toHaveBeenCalled();
  });
});
