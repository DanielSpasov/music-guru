import { useLocation } from 'react-router-dom';

import { Tab } from './helpers';
import { Link } from '../..';

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const { pathname, search } = useLocation();

  return (
    <div className="fixed flex h-16 top-[4.7rem] left-0 right-0 m-auto w-fit">
      <div className="h-16 w-16 bg-neutral-200 dark:bg-neutral-950">
        <div className="h-16 w-16 bg-neutral-50 dark:bg-neutral-800 rounded-tr-[2rem]" />
      </div>

      <div className="flex bg-neutral-200 dark:bg-neutral-950 rounded-b-[2rem] px-4 shadow-sm dark:shadow-neutral-950">
        {tabs.map(x => (
          <Link
            key={x.key}
            to={x.to}
            type="navlink"
            isActive={pathname + search === x.to}
          >
            {x.label}
          </Link>
        ))}
      </div>

      <div className="h-16 w-16 bg-neutral-200 dark:bg-neutral-950">
        <div className="h-16 w-16 bg-neutral-50 dark:bg-neutral-800 rounded-tl-[2rem]" />
      </div>
    </div>
  );
}
