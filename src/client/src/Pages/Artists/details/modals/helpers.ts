import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  fetchArtist: () => Promise<void>;
};

export type EditArtistProps = {
  onClose: () => void;
  fetchArtist: () => Promise<void>;
};
