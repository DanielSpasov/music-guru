import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const IDisc: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 48 48" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
        <path
          strokeLinecap="round"
          d="M24 12c-6.627 0-12 5.373-12 12m12 12c6.627 0 12-5.373 12-12"
        />
        <path d="M24 28a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z" />
      </g>
    </SVG>
  );
};
