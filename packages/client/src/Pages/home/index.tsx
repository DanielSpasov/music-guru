import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

import { Link, List, PageLayout } from '../../Components';
import Api from '../../Api';

const Home = () => {
  const fetchSongs = useCallback(
    (config?: AxiosRequestConfig) =>
      Api.songs.fetch({
        config: {
          ...config,
          params: { ...config?.params, sort: 'release_date', limit: 20 }
        }
      }),
    []
  );
  const fetchAlbums = useCallback(
    (config?: AxiosRequestConfig) =>
      Api.albums.fetch({
        config: {
          ...config,
          params: { ...config?.params, sort: 'release_date', limit: 10 }
        }
      }),
    []
  );

  return (
    <PageLayout title="Home" heading="Home" hideFooter>
      <article>
        <div className="flex justify-between items-center gap-2">
          <h2 className="whitespace-nowrap">Songs: latest releases</h2>
          <div className="bg-neutral-200 dark:bg-neutral-700 w-full h-[1px]" />
          <Link type="link" to="/songs" className="underline whitespace-nowrap">
            See All
          </Link>
        </div>

        <List model="songs" perPage={20} fetchFn={fetchSongs} hideSearch />
      </article>

      <article>
        <div className="flex justify-between items-center gap-2">
          <h2 className="whitespace-nowrap">Albums: latest releases</h2>
          <div className="bg-neutral-200 dark:bg-neutral-700 w-full h-[1px]" />
          <Link
            type="link"
            to="/albums"
            className="underline whitespace-nowrap"
          >
            See All
          </Link>
        </div>

        <List model="albums" perPage={10} fetchFn={fetchAlbums} hideSearch />
      </article>
    </PageLayout>
  );
};

export default Home;
