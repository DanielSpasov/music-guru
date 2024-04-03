import { useState } from 'react';

import { Icon, Tooltip } from '../../';
import { Action } from './helpers';

const darkProps = 'dark:shadow-neutral-950 dark:bg-primary-dark';
const lightProps = 'bg-primary cursor-pointer';
const themeProps = `${lightProps} ${darkProps}`;

const darkHoverProps = 'dark:hover:shadow-lg';
const lightHoverProps = 'hover:opacity-70';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

const disabledProps = 'cursor-auto opacity-50';

export default function ActionBubble({ action }: { action: Action }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center m-4">
      <div
        className={`rounded-full shadow-md ${themeProps} ${
          action?.disabled ? disabledProps : hoverProps
        }`}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseEnter={() => setShowTooltip(true)}
      >
        <Icon
          model={action.icon}
          onClick={action.onClick}
          disabled={action?.disabled}
          className={`w-14 h-14 p-3 [&>path]:fill-white`}
        />
      </div>
      {action?.tooltip && (
        <Tooltip text={action?.tooltip} shown={showTooltip} />
      )}
    </div>
  );
}
