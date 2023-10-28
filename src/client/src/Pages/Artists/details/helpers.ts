import Api from '../../../Api';
import { ModelKeys } from '../../../Api/helpers';

export type ViewProps = Config & {
  id: string;
};

type Config = {
  label: string;
  model: ModelKeys;
  fetchFn: (uid: string) => Promise<any>;
};

export const viewConfig: Record<string, Config> = {
  albums: {
    label: 'Albums',
    model: 'albums',
    fetchFn: (uid: string) =>
      Api.albums.fetch({
        config: { params: { serializer: 'list', artist: uid } }
      })
  },
  features: {
    label: 'Features',
    model: 'songs',
    fetchFn: (uid: string) =>
      Api.songs.fetch({
        config: { params: { serializer: 'list', features__contains: uid } }
      })
  },
  songs: {
    label: 'Songs',
    model: 'songs',
    fetchFn: (uid: string) =>
      Api.songs.fetch({
        config: { params: { serializer: 'list', artist: uid } }
      })
  }
};
