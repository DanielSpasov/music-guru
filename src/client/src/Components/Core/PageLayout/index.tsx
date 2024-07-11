import { FC, useEffect } from 'react';

import { PageLayoutProps } from './types';
import { Loader } from '../../';

// Composables
import Sidebar from './composables/Sidebar';
import Navbar from './composables/Navbar';
import Header from './composables/Header';

const PageLayout: FC<PageLayoutProps> = ({
  // Page
  title,
  heading,
  children,
  loading = false,
  // Navbar
  hideNavbar = false,
  // Header
  hideHeader = false,
  actions = [],
  // Sidebar
  hideSidebar = false,
  hideResourses = false,
  links = []
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
        {!hideSidebar && (
          <Sidebar
            hideResourses={hideResourses}
            hideNavbar={hideNavbar}
            links={links}
          />
        )}

        <main
          data-testid="page-content"
          className={`flex-1 overflow-auto bg-neutral-100 dark:bg-neutral-800 ${
            !hideSidebar ? 'ml-64' : ''
          }`}
        >
          {!hideHeader && <Header heading={heading} actions={actions} />}

          <div className="p-4">
            {loading ? (
              <Loader type="vinyl" data-testid="page-loader" />
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
