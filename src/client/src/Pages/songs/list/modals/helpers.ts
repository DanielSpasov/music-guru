import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  fetchSongs: () => Promise<void>;
};

export type CreateSongProps = {
  onClose: () => void;
  fetchSongs: () => Promise<void>;
};
