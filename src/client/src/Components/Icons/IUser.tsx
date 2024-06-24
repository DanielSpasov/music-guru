import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const IUser: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
      />
    </SVG>
  );
};
