import { FC } from 'react';

import { SVGProps } from '../Common/SVG/helpers';
import { SVG } from '../';

export const ITwitter: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
      />
    </SVG>
  );
};
