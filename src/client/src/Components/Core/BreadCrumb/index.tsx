import { useLocation, useNavigate } from 'react-router-dom';

import { BreadCrumbProps } from './helpers';
import { Icon, Link } from '../../';

const darkProps = 'dark:bg-neutral-900 dark:shadow-sm dark:shadow-neutral-900';

export default function BreadCrumb({ actions, tabs }: BreadCrumbProps) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={` h-16 w-full flex items-center ${darkProps}`}>
      <div className="flex flex-1">
        <div className="p-2">
          <Icon onClick={() => navigate(-1)} model="back" />
        </div>
        <div className="p-2">
          <Icon onClick={() => navigate('/')} model="home" />
        </div>
      </div>

      <div className="flex flex-1 justify-center">
        {tabs.map(tab => (
          <Link
            key={tab.key}
            to={tab.to}
            type="navlink"
            className="p-2"
            isActive={pathname + search === tab.to}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 justify-end">
        {actions.map((action, i) => (
          <div key={i} className="p-2">
            <Icon
              onClick={!action.disabled ? action.perform : null}
              disabled={action.disabled}
              model={action.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
