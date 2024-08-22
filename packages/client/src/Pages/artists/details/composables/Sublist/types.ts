import { Model } from '../../../../../Api/types';

export type SublistProps = {
  fetchFnProps?: Record<string, string>;
  model: Exclude<Model, 'users'>;
  label: string;
  limit: number;
};
