import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const IKey: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m8 18l2-2h2l1.36-1.36a6.5 6.5 0 1 0-3.997-3.992L2 18v4h4l2-2z" />
        <circle cx="17" cy="7" r="1" />
      </g>
    </SVG>
  );
};
