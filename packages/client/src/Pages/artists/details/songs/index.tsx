import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { List, PageLayout, Socials } from '../../../../Components';
import { getSidebarLinks } from '../sidebarLinks';
import { Artist } from '../../../../Types';
import { defaultArtist } from '..';
import Api from '../../../../Api';

const ArtistSongs = () => {
  const { id = '0' } = useParams();

  const [artist, setArtist] = useState<Artist>(defaultArtist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.artists.get({
          config: { params: { serializer: 'detailed' } },
          id
        });

        setArtist(data);
      } catch (error) {
        toast.error('Failed to fetch Artist');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const fetchSongs = useCallback(
    (config?: AxiosRequestConfig) =>
      Api.songs.fetch({
        ...config,
        config: {
          params: {
            ...config?.params,
            'artist.uid': artist.uid
          }
        }
      }),
    [artist.uid]
  );

  return (
    <PageLayout
      title={`${artist.name}'s Songs`}
      heading={`${artist.name}'s Songs`}
      loading={loading}
      links={getSidebarLinks(id)}
      footerContent={<Socials links={artist.links} />}
    >
      <section>
        <List
          sortingConfig={[
            { key: 'created_at', label: 'Date Added' },
            { key: 'favorites', label: 'Favorites' },
            { key: 'name', label: 'Name' }
          ]}
          fetchFn={fetchSongs}
          model="songs"
          favoriteFn={uid => Api.songs.favorite({ uid })}
          skeletonLength={56}
        />
      </section>
    </PageLayout>
  );
};

export default ArtistSongs;
