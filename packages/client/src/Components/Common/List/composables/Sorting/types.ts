import { Dispatch, SetStateAction } from 'react';

import { Sorting } from '../../types';

export type SortingProps = {
  config: Sorting[];
  setValue: Dispatch<SetStateAction<string>>;
};
