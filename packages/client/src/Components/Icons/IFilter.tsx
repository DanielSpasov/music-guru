import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const IFilter: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M472 168H40a24 24 0 0 1 0-48h432a24 24 0 0 1 0 48Zm-80 112H120a24 24 0 0 1 0-48h272a24 24 0 0 1 0 48Zm-96 112h-80a24 24 0 0 1 0-48h80a24 24 0 0 1 0 48Z"
      />
    </SVG>
  );
};
