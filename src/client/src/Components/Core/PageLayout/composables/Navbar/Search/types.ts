import { Model } from '../../../../../../Api/types';

export type SearchProps = {
  models: Model[];
};

type Result = { uid: string; name: string };
export type Results = Partial<Record<Model, Result[]>>;
