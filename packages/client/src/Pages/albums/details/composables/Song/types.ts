import { DiscSong } from '../../../../../Types';

export type SongPrps = {
  song: DiscSong;
  isEditing: boolean;
  onRemove: () => Promise<void> | void;
};
