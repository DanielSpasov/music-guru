import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  openDel: boolean;
  setOpenDel: Dispatch<SetStateAction<boolean>>;
  deleteSong: () => Promise<void>;
  fetchSong: () => Promise<void>;
};

export type EditSongProps = {
  onClose: () => void;
  fetchSong: () => Promise<void>;
};
