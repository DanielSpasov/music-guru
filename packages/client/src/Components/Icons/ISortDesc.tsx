import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../Common';

export const ISortDesc: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h7m-7 6h7m-7 6h9m2-9l3-3l3 3m-3-3v12"
      />
    </SVG>
  );
};
