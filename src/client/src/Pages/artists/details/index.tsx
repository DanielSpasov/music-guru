import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../../../Types/Artist';
import Api from '../../../Api';

// Deatiled view Components
import Image from './Image';
import About from './About';
import Socials from './Socials';

const defaultArtist: Artist = {
  albums: [],
  created_at: new Date(),
  created_by: '',
  favorites: 0,
  features: [],
  image: '',
  name: '',
  songs: [],
  uid: '',
  about: '',
  links: []
};

export default function ArtistDetails() {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist>(defaultArtist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
    })();
  }, [id]);

  return (
    <PageLayout
      title={artist?.name || ''}
      loading={loading}
      showHeader={false}
      actions={[
        {
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== artist?.created_by
        }
      ]}
    >
      <section className="flex mt-5">
        <div className="flex flex-col items-center w-1/3 px-4">
          <Image artist={artist} />
          <About artist={artist} />
          <Socials artist={artist} />
        </div>

        <div className="flex flex-col w-2/3 gap-5">
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
