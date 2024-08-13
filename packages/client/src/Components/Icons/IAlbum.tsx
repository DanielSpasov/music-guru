import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../Common';

export const IAlbum: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="9" r="2" />
        <path d="M15.318 3.631a9 9 0 1 0 5.368 10.736M20 9V2l2 2" />
      </g>
    </SVG>
  );
};
