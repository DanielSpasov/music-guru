import { IconModel } from '../../../Components';
import { ListUser } from '../../../Types/User';

export type UserListProps = {
  items: ListUser[];
  loading: boolean;
  action: (uid: string) => Promise<void>;
  missingMessage: string;
  icon: IconModel;
};
