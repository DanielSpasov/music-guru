import { DiscSong } from '../../../../../Types';

export type SongPrps = {
  song: DiscSong;
  isEditing: boolean;
  isOrdering: boolean;
  isSelected: boolean;
  onSelect: () => Promise<void> | void;
};
