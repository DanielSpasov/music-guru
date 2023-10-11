import { ModelKeys } from '../../../Api/helpers';
import { Artist } from '../helpers';

export type View = {
  label: string;
  model: ModelKeys;
  params?: { name: string; key: keyof Artist };
};

export const views: View[] = [
  {
    label: 'Songs',
    model: 'songs',
    params: { name: 'artist', key: 'uid' }
  },
  {
    label: 'Albums',
    model: 'albums',
    params: { name: 'artist', key: 'uid' }
  },
  {
    label: 'Features',
    model: 'songs',
    params: { name: 'features__contains', key: 'uid' }
  }
];
