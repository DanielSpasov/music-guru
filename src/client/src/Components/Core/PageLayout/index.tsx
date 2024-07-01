import { useEffect } from 'react';

import { Button, Loader, Navbar } from '../../';
import { PageLayoutProps } from './helpers';

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
      <main className="relative min-h-[calc(100vh-80px)] mt-20">
        <header className="flex items-center justify-center relative border-b-[1px] h-[72px] border-neutral-200 dark:border-none dark:shadow-md">
          {showHeader && <h1>{title}</h1>}

          <div className="flex items-center absolute h-full gap-3 top-0 right-[10%] px-4">
            {actions
              .filter(x => !x?.hidden)
              .map((action, i) => {
                switch (action.type) {
                  case 'button':
                    return (
                      <Button
                        key={i}
                        onClick={action.onClick}
                        variant={action.variant}
                        disabled={action?.disabled}
                      >
                        {action.children}
                      </Button>
                    );
                  default:
                    return (
                      <action.Icon
                        key={i}
                        disabled={action?.disabled}
                        onClick={action.onClick}
                      />
                    );
                }
              })}
          </div>
        </header>

        {loading ? (
          <div className="pt-4">
            <Loader type="vinyl" />
          </div>
        ) : (
          <article className="px-[10%] min-h-[calc(100vh-80px-72px)] pt-4 bg-neutral-100 dark:bg-neutral-800">
            {children}
          </article>
        )}
      </main>
    </>
  );
}
