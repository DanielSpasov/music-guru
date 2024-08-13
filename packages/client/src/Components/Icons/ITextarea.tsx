import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const ITextarea: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M6 24h14v2H6zm0-6h20v2H6zm0-6h20v2H6zm0-6h20v2H6z"
      />
    </SVG>
  );
};
