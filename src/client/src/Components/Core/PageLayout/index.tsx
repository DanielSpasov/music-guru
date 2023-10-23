import { useContext, useEffect } from 'react';

import { BreadCrumb, Loader, Navbar } from '../../';
import { PageLayoutProps } from './helpers';
import { ThemeContext } from '../../../Contexts';

export default function PageLayout({
  title,
  showNavbar = true,
  showBreadCrumb = true,
  showHeader = true,
  children,
  actions = [],
  loading = false
}: PageLayoutProps) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

  return (
    <main className={`h-screen ${theme}`}>
      {showNavbar && <Navbar />}
      {showBreadCrumb && <BreadCrumb actions={actions} />}
      {loading ? (
        <div className="mt-12">
          <Loader size="sm" />
        </div>
      ) : (
        <>
          {showHeader && (
            <header>
              <h1 className="text-center p-2 my-4">{title}</h1>
            </header>
          )}
          <article>{children}</article>
        </>
      )}
    </main>
  );
}
