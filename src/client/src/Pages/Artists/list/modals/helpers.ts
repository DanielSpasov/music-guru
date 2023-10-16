import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  openCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
  fetchArtists: () => Promise<void>;
};

export type CreateArtistProps = {
  onClose: () => void;
  fetchArtists: () => Promise<void>;
};
