import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  List,
  PageLayout,
  Image,
  IPen,
  Socials,
  ISettings
} from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { getSidebarLinks } from './sidebarLinks';
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
  editors: [],
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
      Api.albums.fetch({
        config: { params: { 'artist.uid': artist.uid, limit: 5 } }
      }),
    [artist.uid]
  );
  const fetchSongs = useCallback(
    () =>
      Api.songs.fetch({
        config: { params: { 'artist.uid': artist.uid, limit: 10 } }
      }),
    [artist.uid]
  );
  const fetchFeatures = useCallback(
    () =>
      Api.songs.fetch({
        config: { params: { 'features.uid': artist.uid, limit: 10 } }
      }),
    [artist.uid]
  );

  const isOwner = useMemo(
    () => artist.created_by === uid,
    [artist.created_by, uid]
  );

  const isEditor = useMemo(() => {
    if (!uid) return false;
    return Boolean(artist.editors.includes(uid)) || isOwner;
  }, [artist.editors, uid, isOwner]);

  return (
    <PageLayout
      title={artist.name}
      heading={artist.name}
      loading={loading}
      footerContent={<Socials links={artist.links} />}
      links={getSidebarLinks(id)}
      actions={[
        {
          type: 'icon',
          Icon: ISettings,
          onClick: () => navigate('settings'),
          hidden: !isOwner,
          disabled: !isOwner
        },
        {
          type: 'icon',
          Icon: IPen,
          onClick: () => navigate('edit'),
          hidden: !isAuthenticated,
          disabled: !isEditor
        }
      ]}
    >
      <section className={css.wrapper}>
        <article className={css.informationWrapper}>
          <div className="flex flex-col items-center">
            <Image
              src={artist.image}
              alt={artist.name}
              editable={isEditor}
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
            <h2>Discography</h2>
            <List
              favoriteFn={uid => Api.albums.favorite({ uid })}
              fetchFn={fetchAlbums}
              model="albums"
              hideSearch
            />
          </article>

          <article>
            <h2>Songs</h2>
            <List
              favoriteFn={uid => Api.songs.favorite({ uid })}
              fetchFn={fetchSongs}
              model="songs"
              hideSearch
            />
          </article>

          <article>
            <h2>Features</h2>
            <List
              favoriteFn={uid => Api.songs.favorite({ uid })}
              fetchFn={fetchFeatures}
              model="songs"
              hideSearch
            />
          </article>
        </section>
      </section>
    </PageLayout>
  );
};

export default ArtistDetails;
