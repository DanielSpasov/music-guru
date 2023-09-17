import { ModelKeys } from '../../../Api/helpers';

export type CardProps<T> = {
  data: T;
  model?: ModelKeys;
  onClick?: (props: any) => any;
};
