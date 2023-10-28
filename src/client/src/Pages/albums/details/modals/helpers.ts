import { Dispatch, SetStateAction } from 'react';

export type EditAlbumProps = {
  onClose: () => void;
  fetchAlbum: () => Promise<void>;
};

export type DeleteProps = {
  setOpenDel: Dispatch<SetStateAction<boolean>>;
  deleteAlbum: () => Promise<void>;
};
