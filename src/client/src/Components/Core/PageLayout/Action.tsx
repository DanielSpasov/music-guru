import { useState } from 'react';

import { Icon, Tooltip } from '../../';
import { Action } from './helpers';

const darkActionProps =
  'dark:hover:shadow-lg dark:hover:shadow-neutral-950 dark:shadow-neutral-950 dark:bg-primary-dark';

export default function ActionBubble({ action }: { action: Action }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center m-4">
      <div
        className={`rounded-full shadow-md bg-primary hover:opacity-70 ${darkActionProps}`}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseEnter={() => setShowTooltip(true)}
      >
        <Icon
          model={action.icon}
          onClick={action.onClick}
          className={`w-14 h-14 p-3 [&>path]:fill-white`}
        />
      </div>
      {action?.tooltip && (
        <Tooltip text={action?.tooltip} shown={showTooltip} />
      )}
    </div>
  );
}
