import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  fetchArtists: () => void;
};

export type CreateArtistProps = {
  onClose: () => void;
  fetchArtists: () => void;
};
