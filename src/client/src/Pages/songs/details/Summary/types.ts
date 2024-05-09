import { ModelKeys } from '../../../../Api/helpers';
import { ListAlbum } from '../../../../Types/Album';
import { Song } from '../../../../Types/Song';

export type SummaryProps = {
  song: Song;
  albums: ListAlbum[];
  userUID: string | null;
  updateImage: (file: File) => Promise<void>;
};

export type ItemType = 'link' | 'links' | 'date' | 'text';
export type ItemComponentProps = {
  value: any;
  type: ItemType;
  linkType?: ModelKeys;
};

export interface ItemProps extends ItemComponentProps {
  label: string;
}
