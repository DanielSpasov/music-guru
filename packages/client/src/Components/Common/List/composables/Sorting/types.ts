import { AxiosRequestConfig } from 'axios';

import { Sorting } from '../../types';

export type SortingProps = {
  config: Sorting[];
  onApply: (config: AxiosRequestConfig) => void;
};
