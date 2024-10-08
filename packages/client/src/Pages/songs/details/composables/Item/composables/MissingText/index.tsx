import { FC, memo } from 'react';

import { MissingTextProps } from './types';

const MissingText: FC<MissingTextProps> = ({ message = 'None' }) => {
  return (
    <span className="text-lg text-neutral-400 whitespace-nowrap">
      {message}
    </span>
  );
};

export default memo(MissingText);
