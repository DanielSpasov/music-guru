import { AxiosRequestConfig } from 'axios';

import { Filter } from '../../types';

export type FiltersProps = {
  config: Filter[];
  onApply: (config: AxiosRequestConfig) => void;
};
