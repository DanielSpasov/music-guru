import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { List, PageLayout, Image, IPen, Socials } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { Artist } from '../../../Types';
import Api from '../../../Api';

import css from './Details.module.css';

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

const ArtistDetails = () => {
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

  const fetchAlbums = useCallback(
    () =>
      Api.albums.fetch({ config: { params: { 'artist.uid': artist.uid } } }),
    [artist.uid]
  );
  const fetchSongs = useCallback(
    () => Api.songs.fetch({ config: { params: { 'artist.uid': artist.uid } } }),
    [artist.uid]
  );
  const fetchFeatures = useCallback(
    () =>
      Api.songs.fetch({ config: { params: { 'features.uid': artist.uid } } }),
    [artist.uid]
  );

  return (
    <PageLayout
      title={artist.name}
      heading={artist.name}
      loading={loading}
      footerContent={<Socials links={artist.links} />}
      actions={[
        {
          type: 'icon',
          Icon: IPen,
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: uid !== artist.created_by
        }
      ]}
    >
      <section className={css.wrapper}>
        <article className={css.informationWrapper}>
          <div className="flex flex-col items-center">
            <Image
              src={artist.image}
              alt={artist.name}
              editable={artist.created_by === uid}
              updateFn={updateImage}
              shape="circle"
              className="w-64 h-64"
            />
            <h2 className="py-2">{artist.name}</h2>
          </div>

          {artist.about && <span className={css.about}>{artist.about}</span>}
        </article>

        <section className={css.discographyWrapper}>
          <article>
            <h2>Albums</h2>
            <List
              favoriteFn={uid => Api.albums.favorite({ uid })}
              fetchFn={fetchAlbums}
              model="albums"
            />
          </article>

          <article>
            <h2>Songs</h2>
            <List
              favoriteFn={uid => Api.songs.favorite({ uid })}
              fetchFn={fetchSongs}
              model="songs"
            />
          </article>

          <article>
            <h2>Features</h2>
            <List
              favoriteFn={uid => Api.songs.favorite({ uid })}
              fetchFn={fetchFeatures}
              model="songs"
            />
          </article>
        </section>
      </section>
    </PageLayout>
  );
};

export default ArtistDetails;
