import { ListAlbum } from '../../../../Types/Album';
import { Song } from '../../../../Types/Song';

export type SummaryProps = {
  song: Song;
  albums: ListAlbum[];
};
