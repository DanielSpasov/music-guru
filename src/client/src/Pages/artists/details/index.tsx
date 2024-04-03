import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../helpers';
import Api from '../../../Api';

export default function ArtistDetails() {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist>();
  const [loading, setLoading] = useState(true);

  const fetchArtist = useCallback(async () => {
    try {
      const { data } = await Api.artists.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });
      setArtist(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    (async () => await fetchArtist())();
  }, [fetchArtist, id]);

  return (
    <PageLayout
      title={artist?.name || ''}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== artist?.created_by
        }
      ]}
    >
      <section className="flex">
        <div className="w-1/3 flex justify-center">
          <img
            src={artist?.image || ''}
            alt={artist?.name}
            className="h-72 w-72 shadow-lg shadow-neutral-400 dark:shadow-neutral-900 rounded-full"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col w-2/3 gap-5">
          <div>
            <h2>Biography</h2>
            <span className="">{artist?.bio}</span>
          </div>

          <div>
            <h2>Albums</h2>
            <List
              center={false}
              fetchFn={() =>
                Api.albums.fetch({
                  config: { params: { 'artist.uid': artist?.uid } }
                })
              }
              model="albums"
            />
          </div>

          <div>
            <h2>Songs</h2>
            <List
              center={false}
              fetchFn={() =>
                Api.songs.fetch({
                  config: { params: { 'artist.uid': artist?.uid } }
                })
              }
              model="songs"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
