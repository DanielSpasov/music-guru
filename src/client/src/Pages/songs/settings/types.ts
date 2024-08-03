import { ListUser, Song } from '../../../Types';

export type SettingsProps = {
  data: Song;
};

export type Editor = ListUser & {
  isEditor: boolean;
  name: string;
};
