import { FC } from 'react';

import { SVGProps } from '../../../Components/Common/SVG/helpers';
import { ListUser } from '../../../Types';

export type UserListProps = {
  items: ListUser[];
  loading: boolean;
  action: (uid: string) => Promise<void>;
  missingMessage: string;
  Icon: FC<SVGProps>;
};
