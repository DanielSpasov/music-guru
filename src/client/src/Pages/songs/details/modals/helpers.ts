import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
};

export type EditSongProps = {
  onClose: () => void;
};
