import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  openDel: boolean;
  setOpenDel: Dispatch<SetStateAction<boolean>>;
  fetchAlbum: () => Promise<void>;
  deleteAlbum: () => Promise<void>;
};

export type EditAlbumProps = {
  onClose: () => void;
  fetchAlbum: () => Promise<void>;
};
