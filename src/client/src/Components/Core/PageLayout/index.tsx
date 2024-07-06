import { FC, useEffect } from 'react';

import { PageLayoutProps } from './types';
import { Loader } from '../../';

// Composables
import Sidebar from './composables/Sidebar';
import Navbar from './composables/Navbar';
import Header from './composables/Header';

const PageLayout: FC<PageLayoutProps> = ({
  title,
  heading,
  hideNavbar = false,
  hideHeader = false,
  hideSidebar = false,
  children,
  actions = [],
  loading = false
}) => {
  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

  return (
    <div data-testid="page" className="h-screen grid grid-rows-[auto_1fr]">
      {!hideNavbar && <Navbar />}

      <div
        data-testid="page-body"
        className={`flex min-h-screen ${!hideNavbar ? 'pt-16' : ''}`}
      >
        {!hideSidebar && <Sidebar hideNavbar={hideNavbar} />}

        <main
          data-testid="page-content"
          className={`flex-1 overflow-auto bg-neutral-100 dark:bg-neutral-800 ${
            !hideSidebar ? 'ml-64' : ''
          }`}
        >
          {!hideHeader && <Header heading={heading} actions={actions} />}

          {loading ? (
            <div className="pt-4">
              <Loader type="vinyl" data-testid="page-loader" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
