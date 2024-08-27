import { Dispatch, SetStateAction } from 'react';

import { Sorting } from '../../types';

export type SortingProps = {
  value: string;
  config: Sorting[];
  setValue: Dispatch<SetStateAction<string>>;
};
