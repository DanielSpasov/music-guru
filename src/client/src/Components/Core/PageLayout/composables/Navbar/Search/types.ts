import { Model } from '../../../../../../Api/types';
import { BaseModel } from '../../../../../../Types';

export type SearchProps = {
  models: Model[];
};

export type Results = Partial<Record<Model, BaseModel[]>>;
