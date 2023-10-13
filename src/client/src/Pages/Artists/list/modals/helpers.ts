import { Dispatch, SetStateAction } from 'react';

export type ModalsProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fetchArtists: () => void;
};

export type CreateArtistProps = {
  onClose: () => void;
  fetchArtists: () => void;
};
