import { Model } from '../../../../../../Api/types';
import { BaseModel } from '../../../../../../Types';

export type SearchProps = {
  models: Model[];
};

type SearchResult = BaseModel & {
  image?: string;
  artist?: {
    uid?: string;
    name?: string;
  };
};

export type Results = Partial<Record<Model, SearchResult[]>>;
