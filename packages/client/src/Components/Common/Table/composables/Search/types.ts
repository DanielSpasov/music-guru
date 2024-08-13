import { Dispatch, SetStateAction } from 'react';

export type SearchProps = {
  setValue: Dispatch<SetStateAction<string>>;
};
