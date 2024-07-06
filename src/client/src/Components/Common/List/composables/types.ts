import { Config } from '../../../../Api/helpers';
import { Filter } from '../types';

export type FiltersProps = {
  config: Filter[];
  onApplyFilters: (config: Config) => Promise<void>;
};
