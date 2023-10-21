import { ActionsProps } from './helpers';
import { Icon } from '../../';

export default function Actions({ actions }: ActionsProps) {
  return (
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
  );
}
