import { useEffect } from 'react';

import { PageLayoutProps } from './helpers';
import { Loader, Navbar } from '../../';
import Action from './Action';
import Tabs from './Tabs';

export default function PageLayout({
  title,
  showNavbar = true,
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
      {tabs.length ? <Tabs tabs={tabs} /> : null}

      <div className={`${tabs.length ? 'pt-36' : 'pt-20'}`}>
        {loading ? (
          <Loader size="sm" />
        ) : (
          <>
            {showHeader && (
              <header>
                <h1 className="text-center p-2 my-4">{title}</h1>
              </header>
            )}
            <article>
              {children}
              <div className="fixed z-0 bottom-0 right-0">
                {actions
                  .filter(x => !x?.disabled)
                  .map((action, i) => (
                    <Action action={action} key={i} />
                  ))}
              </div>
            </article>
          </>
        )}
      </div>
    </main>
  );
}
