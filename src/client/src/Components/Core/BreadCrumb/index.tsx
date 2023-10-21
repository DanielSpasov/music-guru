import { useNavigate } from 'react-router-dom';

import { BreadCrumbProps } from './helpers';
import { Icon } from '../../';

export default function BreadCrumb({ actions }: BreadCrumbProps) {
  const navigate = useNavigate();

  return (
    <div className="h-16 w-full flex justify-between items-center shadow-md shadow-black z-40">
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
