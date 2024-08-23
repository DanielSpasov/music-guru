import { Disc } from '../../../../../Types';

export type DiscProps = {
  disc: Disc;
  loading: boolean;
  isEditor: boolean;
  onDelete: (number: number) => Promise<void> | void;
  onAddSongs: (songs: string[], disc: number) => Promise<void> | void;
  onRemoveSongs: (songs: string[], disc: number) => Promise<void> | void;
  onOrderSongs: (
    songs: { number: number; uid: string }[],
    disc: number
  ) => Promise<void> | void;
};
