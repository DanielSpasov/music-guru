import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../Common';

export const ISong: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
        <path d="M9 17V4h10v13M9 8h10" />
      </g>
    </SVG>
  );
};
