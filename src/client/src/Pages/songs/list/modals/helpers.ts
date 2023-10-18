import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
};

export type CreateSongProps = {
  onClose: () => void;
};