import { FC } from 'react';
import { SVG } from '../Common';
import { SVGProps } from '../Common/SVG/helpers';

export const ISignOut: FC<SVGProps> = props => {
  return (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
      />
    </SVG>
  );
};
