import { useEffect, useState } from 'react';

import { Action as IAction, PageLayoutProps } from './helpers';
import { Icon, Loader, Navbar, Tooltip } from '../../';

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

function Action({ action }: { action: IAction }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="flex items-center bg-neutral-300 dark:bg-neutral-900 shadow-lg rounded-full m-4"
      onMouseLeave={() => setShowTooltip(false)}
      onMouseEnter={() => setShowTooltip(true)}
    >
      <Icon
        model={action.icon}
        onClick={action.onClick}
        className="w-14 h-14 p-3"
      />
      {action?.tooltip && (
        <Tooltip text={action?.tooltip} shown={showTooltip} />
      )}
    </div>
  );
}
