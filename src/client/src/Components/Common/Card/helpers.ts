import { ModelKeys } from '../../../Api/helpers';
import { Favorites } from '../../../Contexts';

export interface CardProps<T> {
  data: T;
  loading?: boolean;
  onClick?: (props: any) => any;
}

export interface CardSwitchProps extends CardProps<any> {
  model: Exclude<ModelKeys, 'user'>;
  favoriteFn?: (uid: string) => Promise<{ favorites: Favorites }>;
}
