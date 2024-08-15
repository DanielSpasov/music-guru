import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { List, PageLayout, Socials } from '../../../../Components';
import { getSidebarLinks } from '../sidebarLinks';
import { Artist } from '../../../../Types';
import { defaultArtist } from '..';
import Api from '../../../../Api';

const ArtistMixtapes = () => {
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

  const fetchMixtapes = useCallback(
    () =>
      Api.albums.fetch({
        config: { params: { 'artist.uid': artist.uid, 'type.code': 'M' } }
      }),
    [artist.uid]
  );

  return (
    <PageLayout
      title={`${artist.name}'s Mixtapes`}
      heading={`${artist.name}'s Mixtapes`}
      loading={loading}
      links={getSidebarLinks(id)}
      footerContent={<Socials links={artist.links} />}
    >
      <section>
        <List
          fetchFn={fetchMixtapes}
          model="albums"
          favoriteFn={uid => Api.albums.favorite({ uid })}
          skeletonLength={10}
        />
      </section>
    </PageLayout>
  );
};

export default ArtistMixtapes;
