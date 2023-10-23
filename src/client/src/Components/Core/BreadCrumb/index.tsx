import { useNavigate } from 'react-router-dom';

import { BreadCrumbProps } from './helpers';
import { Icon } from '../../';

const darkProps = 'dark:bg-neutral-900 dark:shadow-sm dark:shadow-neutral-900';

export default function BreadCrumb({ actions }: BreadCrumbProps) {
  const navigate = useNavigate();

  return (
    <div
      className={` h-16 w-full flex justify-between items-center ${darkProps}`}
    >
      <div className="flex">
        <div className="p-2">
          <Icon onClick={() => navigate(-1)} model="back" />
        </div>
        <div className="p-2">
          <Icon onClick={() => navigate('/')} model="home" />
        </div>
      </div>

      <div className="flex">
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
