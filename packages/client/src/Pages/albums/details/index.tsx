import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  IPen,
  ISettings,
  ITrashBin,
  Image,
  Link,
  PageLayout,
  Socials
} from '../../../Components';
import { defaultArtist } from '../../artists/details';
import { AuthContext } from '../../../Contexts/Auth';
import { Album } from '../../../Types';
import Api from '../../../Api';

import css from './index.module.css';

// Composables
import Tracklist from './composables/Tracklist';

export const defaultAlbum: Album = {
  uid: '',
  about: '',
  created_at: new Date(),
  created_by: '',
  image: '',
  name: '',
  release_date: null,
  songs: [],
  discs: [],
  links: [],
  artist: defaultArtist,
  favorites: 0,
  editors: [],
  type: {
    name: '',
    code: '',
    uid: ''
  }
};

const AlbumDetails = () => {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const { id = '0' } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<Album>(defaultAlbum);
  const [loading, setLoading] = useState(true);

  const deleteAlbum = useCallback(async () => {
    try {
      setLoading(true);
      await Api.albums.del({ id: album.uid });
      navigate('/albums');
      toast.success(`Successfully deleted album: ${album.name}`);
    } catch (error) {
      toast.error('Failed to delete album');
    } finally {
      setLoading(false);
    }
  }, [album, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.albums.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });
        setAlbum(data);
      } catch (error) {
        toast.error('Failed to fetch Album');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const updateImage = useCallback(
    async (file: File) => {
      const { image } = await Api.albums.updateImage({
        uid: album.uid,
        image: file,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      setAlbum(prev => ({ ...prev, image }));
    },
    [album?.uid]
  );

  const isOwner = useMemo(
    () => album.created_by === uid,
    [album.created_by, uid]
  );

  const isEditor = useMemo(() => {
    if (!uid) return false;
    return Boolean(album.editors.includes(uid)) || isOwner;
  }, [album.editors, uid, isOwner]);

  return (
    <PageLayout
      title={album.name}
      heading={album.name}
      loading={loading}
      footerContent={<Socials links={album.links} />}
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
        },
        {
          type: 'icon',
          Icon: ITrashBin,
          onClick: deleteAlbum,
          hidden: !isOwner,
          disabled: !isOwner
        }
      ]}
    >
      <section className={css.wrapper}>
        <article className={css.informationWrapper}>
          <Image
            src={album.image}
            alt={album.name}
            editable={isEditor}
            updateFn={updateImage}
            className="w-96 h-96"
          />

          <p className="p-1">
            <span className="font-semibold text-lg">
              {album.type.name} By:{' '}
            </span>
            <Link
              type="link"
              to={`/artists/${album.artist.uid}`}
              className="font-semibold text-2xl underline"
            >
              {album.artist.name}
            </Link>
          </p>

          <p className="p-1">
            <span className="font-semibold text-lg">Release Date: </span>
            {album.release_date
              ? moment(album.release_date).format('ddd MMM DD YYYY')
              : 'TBA'}
          </p>

          {album.about && <span className={css.about}>{album.about}</span>}
        </article>

        <Tracklist
          isEditor={isEditor}
          discs={album.discs}
          artist={album.artist.uid}
        />
      </section>
    </PageLayout>
  );
};

export default AlbumDetails;
