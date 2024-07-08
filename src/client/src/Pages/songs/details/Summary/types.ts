import { ListAlbum } from '../../../../Types/Album';
import { Model } from '../../../../Api/types';
import { Song } from '../../../../Types/Song';

export type SummaryProps = {
  song: Song;
  albums: ListAlbum[];
};

export type ItemType = 'link' | 'links' | 'date' | 'text';
export type ItemComponentProps = {
  value: any;
  type: ItemType;
  linkType?: Model;
};

export interface ItemProps extends ItemComponentProps {
  label: string;
}
