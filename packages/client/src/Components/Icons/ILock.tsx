import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const ILock: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"
      />
    </SVG>
  );
};
