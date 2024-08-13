import { AxiosRequestConfig } from 'axios';

import { Filter } from '../types';

export type FiltersProps = {
  config: Filter[];
  onApplyFilters: (config: AxiosRequestConfig) => Promise<void>;
};
