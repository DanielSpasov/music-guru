import { Model } from '../../../../../../Api/types';

export type SearchProps = {
  models: Model[];
};

export type Results = Partial<Record<Model, any[]>>;
