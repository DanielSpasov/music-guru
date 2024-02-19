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
    <>
      <header>{showNavbar && <Navbar />}</header>
      <main className={`min-h-screen ${tabs.length ? 'pt-36' : 'pt-20'}`}>
        {showHeader && <h1 className="text-center p-4">{title}</h1>}
        {tabs.length ? <Tabs tabs={tabs} /> : null}

        {loading ? (
          <Loader size="sm" />
        ) : (
          <>
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
      </main>
    </>
  );
}
