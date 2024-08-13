import { Dispatch, SetStateAction } from 'react';

export type HeaderProps = {
  showAdd: boolean;
  disableAdd: boolean;
  setShowNewVerse: Dispatch<SetStateAction<boolean>>;
};
