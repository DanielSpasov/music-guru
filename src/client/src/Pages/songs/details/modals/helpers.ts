import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  openDel: boolean;
  setOpenDel: Dispatch<SetStateAction<boolean>>;
  deleteSong: () => void;
};

export type EditSongProps = {
  onClose: () => void;
};
