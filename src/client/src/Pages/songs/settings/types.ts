import { ListUser } from '../../../Types';

export type Editor = ListUser & {
  isEditor: boolean;
  name: string;
};
