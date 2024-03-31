import Api from '../../../Api';
import { Config as ParamsConfig, ModelKeys } from '../../../Api/helpers';

export type ViewProps = Config & {
  id: string;
};

type Config = {
  label: string;
  model: ModelKeys;
  fetchFn: (uid: string) => (config?: ParamsConfig) => Promise<{ data: any[] }>;
};

export const viewConfig: Record<string, Config> = {
  albums: {
    label: 'Albums',
    model: 'albums',
    fetchFn: uid => config =>
      Api.albums.fetch({
        config: {
          params: {
            serializer: 'list',
            artist: uid,
            ...config?.params
          }
        }
      })
  },
  features: {
    label: 'Features',
    model: 'songs',
    fetchFn: uid => config =>
      Api.songs.fetch({
        config: {
          params: {
            serializer: 'list',
            features__contains: uid,
            ...config?.params
          }
        }
      })
  },
  songs: {
    label: 'Songs',
    model: 'songs',
    fetchFn: uid => config =>
      Api.songs.fetch({
        config: {
          params: {
            serializer: 'list',
            artist: uid,
            ...config?.params
          }
        }
      })
  }
};
