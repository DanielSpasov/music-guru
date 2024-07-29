import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const IPalette: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23ZM84 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm0-56a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm44-24a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm44 24a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
      />
    </SVG>
  );
};
