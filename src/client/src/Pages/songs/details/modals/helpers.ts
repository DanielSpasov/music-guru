import { Dispatch, SetStateAction } from 'react';

export type EditSongProps = {
  onClose: () => void;
  fetchSong: () => Promise<void>;
};

export type DeleteSongProps = {
  setOpenDel: Dispatch<SetStateAction<boolean>>;
  deleteSong: () => Promise<void>;
  fetchSong: () => Promise<void>;
};
