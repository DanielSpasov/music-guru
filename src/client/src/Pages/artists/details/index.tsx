import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { List, PageLayout, Image } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Artist } from '../../../Types/Artist';
import Api from '../../../Api';

// Deatiled view Components
import About from './About';
import Socials from './Socials';

export const defaultArtist: Artist = {
  created_at: new Date(),
  created_by: '',
  favorites: 0,
  image: '',
  name: '',
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
        toast.error('Failed to fetch Artist');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const updateImage = useCallback(
    async (file: File) => {
      const { image } = await Api.artists.updateImage({
        uid: artist.uid,
        image: file,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      setArtist(prev => ({ ...prev, image }));
    },
    [artist.uid]
  );

  return (
    <PageLayout
      title={artist.name}
      loading={loading}
      showHeader={false}
      actions={[
        {
          icon: 'edit',
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== artist.created_by
        }
      ]}
    >
      <section className="flex mt-5">
        <div className="flex flex-col items-center w-1/3 px-4">
          <div className="flex flex-col items-center">
            <Image
              src={artist.image}
              alt={artist.name}
              editable={artist.created_by === uid}
              updateFn={updateImage}
            />
            <h2 className="py-2">{artist.name}</h2>
          </div>

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
                  config: { params: { 'artist.uid': artist.uid } }
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
                  config: { params: { 'artist.uid': artist.uid } }
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
