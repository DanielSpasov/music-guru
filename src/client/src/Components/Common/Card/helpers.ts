import { ModelKeys } from '../../../Api/helpers';

export type CardProps<T> = {
  data: T;
  model?: ModelKeys;
  loading?: boolean;
  onClick?: (props: any) => any;
};
