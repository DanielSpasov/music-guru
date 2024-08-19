import { ListUser, Song } from '../../../Types';

export type SettingsProps = {
  data: Song;
};

export type Editor = ListUser & {
  is_editor: boolean;
  name: string;
};
