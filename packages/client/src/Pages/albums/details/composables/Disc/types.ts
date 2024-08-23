import { Disc } from '../../../../../Types';

export type DiscProps = {
  disc: Disc;
  artist: string;
  loading: boolean;
  onDelete: (number: number) => Promise<void> | void;
  onAddSongs: (songs: string[], disc: number) => Promise<void> | void;
  onRemoveSong: (songs: string[], disc: number) => Promise<void> | void;
};
