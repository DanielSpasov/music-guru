import { Model } from '../../../Api/types';

export type CardProps<T> = {
  data: T;
  loading?: boolean;
};

export type CardModel = Exclude<Model, 'users'>;

export type CardSwitchProps<T> = CardProps<T> & {
  model: CardModel;
};
