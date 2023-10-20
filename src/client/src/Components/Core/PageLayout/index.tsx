import { useEffect } from 'react';

import { BreadCrumb, Loader, Navbar } from '../../';
import { PageLayoutProps } from './helpers';

export default function PageLayout({
  title,
  showNavbar = true,
  showBreadCrumb = true,
  showHeader = true,
  children,
  actions = [],
  loading = false
}: PageLayoutProps) {
  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

  return (
    <main className="h-screen bg-neutral-900">
      {showNavbar && <Navbar />}
      {showBreadCrumb && <BreadCrumb actions={actions} />}
      {loading ? (
        <div className="text-center m-4">
          <Loader rainbow />
        </div>
      ) : (
        <>
          {showHeader && (
            <header>
              <h1 className="p-2 my-4 text-white text-center text-3xl font-bold">
                {title}
              </h1>
            </header>
          )}
          <article>{!loading && children}</article>
        </>
      )}
    </main>
  );
}
