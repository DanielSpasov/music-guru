import { useEffect } from 'react';

import { PageLayoutProps } from './helpers';
import { Icon, Loader, Navbar } from '../../';

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
    <main className="min-h-screen">
      {showNavbar && <Navbar />}
      <div className="pt-20">
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
                {actions.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-neutral-300 dark:bg-neutral-900 shadow-lg rounded-full m-4"
                  >
                    <Icon
                      model={action.icon}
                      disabled={action.disabled}
                      onClick={action.onClick}
                      className="w-14 h-14 p-3 [&~div]:hover:right-24 [&~div]:hover:opacity-100"
                    />
                    {action?.tooltip && (
                      <div className="absolute right-20 h-14 bg-neutral-300 dark:bg-neutral-900 p-4 rounded-lg opacity-0 pointer-events-none">
                        <div className="absolute -right-2 top-5 bg-neutral-300 dark:bg-neutral-900 w-4 h-4 rotate-45" />
                        <span className="whitespace-nowrap">
                          {action?.tooltip}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          </>
        )}
      </div>
    </main>
  );
}
