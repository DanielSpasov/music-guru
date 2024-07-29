import { FC, memo } from 'react';

import { LabelProps } from './types';

const Label: FC<LabelProps> = ({ required = false, label }) => {
  return (
    <label>
      {label} <span className="text-red-400">{required && '*'}</span>
    </label>
  );
};

export default memo(Label);
