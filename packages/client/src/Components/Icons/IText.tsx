import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const IText: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 12 12" {...props}>
      <path
        fill="currentColor"
        d="M2 2.75A.75.75 0 0 1 2.75 2h6a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3.5H6.5v5h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5H5v-5H3.5v.75a.75.75 0 0 1-1.5 0v-1.5Z"
      />
    </SVG>
  );
};
