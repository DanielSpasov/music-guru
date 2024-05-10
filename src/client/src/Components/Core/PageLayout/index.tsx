import { useEffect } from 'react';

import { PageLayoutProps } from './helpers';
import { Loader, Navbar } from '../../';
import Action from './Action';

export default function PageLayout({
  title,
  showNavbar = true,
  showHeader = true,
  children,
  actions = [],
  loading = false
}: PageLayoutProps) {
  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="relative min-h-screen mt-20">
        {showHeader && <h1 className="text-center p-4">{title}</h1>}

        {loading ? (
          <div className="pt-4">
            <Loader size="sm" />
          </div>
        ) : (
          <article className="mx-[10%]">
            {children}
            <div className="fixed z-0 bottom-0 right-0">
              {actions
                .filter(x => !x?.hidden)
                .map((action, i) => (
                  <Action action={action} key={i} />
                ))}
            </div>
          </article>
        )}
      </main>
    </>
  );
}
