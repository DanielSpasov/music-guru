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
            <h1 className="p-2 text-white text-center text-3xl font-bold">
              {title}
            </h1>
          )}
          <article>{!loading && children}</article>
        </>
      )}
    </main>
  );
}
