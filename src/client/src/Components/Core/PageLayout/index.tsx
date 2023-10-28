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
  tabs = [],
  loading = false
}: PageLayoutProps) {
  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

  return (
    <main className="min-h-screen">
      {showNavbar && <Navbar />}
      {showBreadCrumb && <BreadCrumb actions={actions} tabs={tabs} />}
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
