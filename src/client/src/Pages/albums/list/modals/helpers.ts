import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  fetchAlbums: () => Promise<void>;
};

export type CreateAlbumProps = {
  onClose: () => void;
  fetchAlbums: () => Promise<void>;
};
