import { ModelKeys } from '../../../../../../Api/helpers';

export type SearchProps = {
  models: ModelKeys[];
};

export type Results = Partial<Record<ModelKeys, any[]>>;
