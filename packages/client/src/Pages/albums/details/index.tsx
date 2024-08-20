import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  IPen,
  ISettings,
  ITrashBin,
  Image,
  List,
  PageLayout
} from '../../../Components';
import { defaultArtist } from '../../artists/details';
import { AuthContext } from '../../../Contexts/Auth';
import { Album } from '../../../Types';
import Api from '../../../Api';

export const defaultAlbum: Album = {
  uid: '',
  created_at: new Date(),
  created_by: '',
  image: '',
  name: '',
  release_date: null,
  songs: [],
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

  const fetchArtist = useCallback(
    () =>
      Promise.resolve({
        data: [album.artist],
        pagination: {
          totalItems: 1,
          totalPages: 1,
          currentPage: 0
        }
      }),
    [album]
  );

  const fetchSongs = useCallback(
    () =>
      Promise.resolve({
        data: album.songs || [],
        pagination: {
          totalItems: album.songs.length,
          totalPages: 1,
          currentPage: 0
        }
      }),
    [album]
  );

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
      hideFooter
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
      <section className="flex flex-col items-center text-white">
        <Image
          src={album.image}
          alt={album.name}
          editable={isEditor}
          updateFn={updateImage}
          className="w-64 h-64"
        />

        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-center">Artist</h3>
            <List
              favoriteFn={uid => Api.artists.favorite({ uid })}
              fetchFn={fetchArtist}
              skeletonLength={1}
              model="artists"
              hideSearch
            />
          </div>
          <div>
            <h3 className="text-center">Songs</h3>
            <List
              favoriteFn={uid => Api.songs.favorite({ uid })}
              fetchFn={fetchSongs}
              skeletonLength={3}
              model="songs"
              hideSearch
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AlbumDetails;
