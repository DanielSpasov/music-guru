import { FC } from 'react';

import { ListUser } from '../../../Types/User';
import { SVGProps } from '../../../Components/Common/SVG/helpers';

export type UserListProps = {
  items: ListUser[];
  loading: boolean;
  action: (uid: string) => Promise<void>;
  missingMessage: string;
  Icon: FC<SVGProps>;
};
