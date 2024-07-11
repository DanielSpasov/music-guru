import { useLocation } from 'react-router-dom';
import { FC, useEffect } from 'react';

import { RecentItem } from './composables/Sidebar/types';
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
  dontSaveRecent = false,
  // Navbar
  hideNavbar = false,
  // Header
  hideHeader = false,
  actions = [],
  // Sidebar
  hideRecent = false,
  hideSidebar = false,
  hideResourses = false,
  links = []
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

  useEffect(() => {
    if (loading || !title || dontSaveRecent) return;

    const recent = localStorage.getItem('recently_viewed') || '[]';
    const recently_viewed: RecentItem[] = JSON.parse(recent);

    console.log(loading, title);

    if (recently_viewed.find(x => x.to === pathname)) return;

    if (recently_viewed.length === 10) recently_viewed.pop();
    recently_viewed.unshift({ to: pathname, name: title });
    localStorage.setItem('recently_viewed', JSON.stringify(recently_viewed));
  }, [title, loading, dontSaveRecent, pathname]);

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
            hideRecent={hideRecent}
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
